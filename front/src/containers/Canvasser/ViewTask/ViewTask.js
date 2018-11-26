import React, { Component } from "react";
import Task from "./Task";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
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
    mounted: false
  };

  componentDidMount() {
    let addresses = {};
    axios
      .get("/task/activeTask/?_id=" + userID)
      .then(response => {
        const data = response.data.locations;
        const length = data.locations.length;
        for (let i = 0; i < length; i++) {
          const splitAddress = data[i].address.split(" ");
          const newAddress = {
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            number: splitAddress[0],
            street: splitAddress[1],
            city: splitAddress[2],
            zipcode: splitAddress[3],
            qNa: data[i].qNa,
            id: this.state.locations.length + 1,
            _id: data[i]._id,
            anonymous: data[i].anonymous,
            visited: data[i].visited
          };
          addresses.push(newAddress);
        }
        this.setState({
          mounted: true,
          locations: addresses
        });
      })
      .catch(error => {
        console.log("USER ID Error", userID);
        console.log(error);
      });
  }

  submitHandler = e => {};

  render() {
    if (mounted) {
      return (
        <div>
          <h1>View Task</h1>
          <div className="nest">
            <Map center={this.state.positions[0]} zoom={this.state.zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              {this.state.positions.map(pos => (
                <Marker key={pos.id} position={pos} />
              ))}
            </Map>
            <h2>Next Recommended Location</h2>
            <div className="nest">
              <Task key={this.state.nextLoc.id} task={this.state.nextLoc} />
            </div>
            <h2>Unvisited Location</h2>
            <div className="nest">
              {this.state.locations.map(task => (
                <Task key={task.id} task={task} />
              ))}
            </div>
            <h2>Visited Location</h2>
            <div className="nest">
              {this.state.visitedLoc.map(task => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ViewTask;
