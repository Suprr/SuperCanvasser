import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import Modal from "../../../components/UI/Modal/Modal";
import axios from "../../../axios";
import classes from './UpcomingTask.module.css'
class Upcomingtasks extends Component {
  state = {
    center: [],
    tasks: [],
    mounted: false,
    zoom: 13,
    empty: true,
    show: false,
    curLocations: []
  };


  postAxios=(locationID)=>{
      return axios.post('/task/locations',locationID);
  }


  componentDidMount() {
    let newTasks = [];
    const userInfoData = JSON.parse(sessionStorage.getItem("userInfo"));
    const userID = userInfoData._id;
    let tempCurLocations = [];
    axios
      .get("/task/getByCan/?_id=" + userID)
      .then(response => {
        const data = response.data;
        const length = data.length;
        for (let i = 0; i < length; i++) {
          if (i == 0) {
            data[i].selected = true;
          }
          else {
            data[i].selected = false;
          }
          newTasks.push(data[i]);
        }
        console.log(['ComponentDidmont'], newTasks);
        
        let postAxiosArray = [];
        
        newTasks.map(task => {
          postAxiosArray.push(this.postAxios(task.locations)); 

        });

        Promise.all(postAxiosArray).then(result => {
           
           for (let i = 0; i < result.length ; i++) {
              newTasks[i].locations = result[i].data;
           }
          if (newTasks.length == 0) {
            this.setState({ mounted: true });
          } else {
            console.log([newTasks[0].locations[0].latitude, newTasks[0].locations[0].longitude], newTasks[0].locations, newTasks[0]);
            this.setState({ mounted: true, empty: false, tasks:newTasks,curLocations:newTasks[0].locations, center:[newTasks[0].locations[0].latitude, newTasks[0].locations[0].longitude] });
          }
        });
      
      })
      .catch(error => {
        console.log("USER ID Error", userID);
        console.log(error);
      });
  }

  handleChangeSelected = e => {
    let newTasks = this.state.tasks;
    newTasks.map(task => {
      if (task._id == e._id) {
        task.selected = true;
      } else {
        task.selected = false;
      }
    });
    this.setState({ tasks: newTasks, curLocations: e.locations, center:[e.locations[0].latitude, e.locations[0].longitude]});
  };

  handleView = e => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  };
  render() {
    if (this.state.tasks.length != 0) {
    let marker = 1;
    let keyForLoc = 0;
    let locations = (
      <div>
        {this.state.curLocations.map(locations => (
          <div key={locations._id} className = {[classes.LocationItem, 'row'].join(' ')}>
            <div className = "col-sm"/>
            <div className ={[classes.LocationAddr, 'col-sm'].join(' ')} key={keyForLoc++}>{locations.address}</div>
            <div className = "col-sm"/>
          </div>
        ))}
      </div>
    );
    const map =
      !this.state.empty && this.state.mounted ? (
        <div className="nest">
          <h4>{this.state.tasks[0].date}</h4>
          <Map center={this.state.center} zoom={this.state.zoom}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {this.state.curLocations.map(loc=> (
              <Marker
              key={marker}
              attribution={marker}
              position={[loc.latitude, loc.longitude]}
              >
              <Tooltip direction="center"permanent>
              <span>{marker++}</span>
              </Tooltip>
              </Marker>
              ))}
          </Map>
          <table className="table table-hover border">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Locations</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map(task => (
                <tr
                  className={task.selected ? "table-active" : ""}
                  onClick={() => this.handleChangeSelected(task)}
                  key={task._id}
                >
                  <td>{task.date}</td>
                  <td>
                    <button
                      onClick={() => this.handleView(task)}
                      className="btn btn-light"
                    >
                      View Locations
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4>No Tasks Assigned</h4>
      );
    if (this.state.mounted) {
      return (
        <div>
          <Modal
            show={this.state.show}
            modalClosed={this.closeModal}
            children={locations}
          />
          <h1>Upcoming Canvassing</h1>
          {map}
        </div>
      );
    } else {
      return <div />;
    }
  }
  return (
    <div>
    <h4> No Tasks Assigned</h4>
    </div>
    );
}
}

export default Upcomingtasks;
