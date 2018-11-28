import React, { Component } from "react";
import Task from "./Task";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import QModal from "./QModal";
import axios from "../../../axios";

class ViewTask extends Component {
  state = {
    nextLoc: {},
    locations: [],
    visitedLoc: [],
    positions: [],
    zoom: 13,
    show: false,
    questions: null,
    mounted: false,
    task: null
  };

  componentDidMount() {
    let addresses = [];
    let visAddresses = [];
    const userInfoData = JSON.parse(sessionStorage.getItem("userInfo"));
    const userID = userInfoData._id;
    axios
      .get("/task/activeTask/?_id=" + userID)
      .then(response => {
        const resData = response.data.locations;
        axios.post("/task/locations", resData).then(res => {
          const data = res.data;
          const length = data.length;
          console.log(res, res.data);
          for (let i = 0; i < length; i++) {
            const splitAddress = data[i].address.split(",");
            const newAddress = {
              latitude: data[i].latitude,
              longitude: data[i].longitude,
              number: splitAddress[0],
              street: splitAddress[1],
              city: splitAddress[2],
              state: splitAddress[3],
              zipcode: splitAddress[4],
              address: data[i].address,
              qNa: data[i].qNa,
              id: i + 1,
              _id: data[i]._id,
              anonymous: data[i].anonymous,
              visited: data[i].visited,
              rating: 1
            };
            if (newAddress.visited) {
              visAddresses.push(newAddress);
            }
            else {
              addresses.push(newAddress);
            }
          }
          console.log('Component Did mount for View Task', addresses);
          this.setState({
            mounted: true,
            locations: addresses,
            task: response.data
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
      .catch(error => {
        console.log("USER ID Error", userID);
        console.log(error);
      });
  }

  submitHandler = e => {
    e.visited = true;
    let newLoc = this.state.locations;
    let newVisitedLoc = this.state.visitedLoc;
    let task = this.state.task;
    let allVisited = true;
    for (let i = 0; i < newLoc.length; i++) {
      if (newLoc[i].id == e.id) {
        task.locations.map(location =>{
          if (location._id == newLoc[i].id) {
            location.visited = true;
            location.qNa = e.qNa;
            location.anonymous = e.anonymous;
            location.rating = e.rating;
          }
          if (location.visited == false) {
            allVisited = false;
          }
        });
        newLoc.splice(i, 1);
        if (i != 0) {
          if ((Math.abs(e.latitude - newLoc[0].latitude) + Math.abs(e.longitude - newLoc[0].longitude)) > (Math.abs(e.latitude - newLoc[newLoc.length-1].latitude) + Math.abs(e.longitude - newLoc[newLoc.length-1].longitude))) {
            console.log("Reverse List",(Math.abs(e.latitude - newLoc[0].latitude) + Math.abs(e.longitude - newLoc[0].longitude)) , Math.abs(e.latitude - newLoc[newLoc.length-1].latitude) + Math.abs(e.longitude - newLoc[newLoc.length-1].longitude));
            let tempList = [];
            for (let j = newLoc.length - 1; j >=0; j--) {
              tempList.push(newLoc[j]);
            }
            newLoc = tempList;
          }
        }
      }
    }
    if (allVisited) {
      task.taskStatus = "COMPLETED";
    }
    newVisitedLoc.push(e);
    axios.post("/task/updateLoc", e)
    .catch(error => {
      console.log(error);
    });
    axios.post("/task/edit", task)
    .catch(error => {
        console.log(error);
      });
    this.setState({ visitedLoc: newVisitedLoc, locations: newLoc, task:task });
  };

  render() {
    if (
      this.state.mounted &&
      (this.state.locations.length > 0 || this.state.visitedLoc.length > 0)
    ) {
      if (this.state.locations.length == 0) {
        let marker = 1;
        return (
        <div className='col-11'>
          <h1>View Task</h1>
          <h4>All Locations Visited</h4>
        </div>
      );
      }
      else {
      let marker = 1;
      return (
        <div className='col-11'>
          <h1>View Task</h1>
          <div className="nest">
            <Map center={[this.state.locations[0].latitude,this.state.locations[0].longitude]} zoom={this.state.zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              {this.state.locations.map(loc=> (
              <Marker
              key={loc.id}
              attribution={loc.id}
              position={[loc.latitude, loc.longitude]}
              >
              <Tooltip direction="center"permanent>
              <span>{loc.id}</span>
              </Tooltip>
              </Marker>
              ))}
            </Map>
            <h2>Next Recommended Location</h2>
            <div className="nest">
              <Task
                key={this.state.locations[0].id}
                loc={this.state.locations[0]}
                submit={this.submitHandler}
              />
            </div>
            <h2>Unvisited Location</h2>
            <div className="nest">
              {this.state.locations.map(loc => (
                <Task key={loc._id} loc={loc} submit={this.submitHandler} />
              ))}
            </div>
            <h2>Visited Location</h2>
            <div className="nest">
              {this.state.visitedLoc.map(loc => (
                <Task key={loc._id} loc={loc} submit={this.submitHandler} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  } else {
      return (
        <div>
          <h1>View Task</h1>
          <h4>No Current Task</h4>
        </div>
      );
    }
  }
}

export default ViewTask;
