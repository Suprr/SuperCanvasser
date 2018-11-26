import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Modal from "../../../components/UI/Modal/Modal";
import axios from "../../../axios";
class Upcomingtasks extends Component {
  state = {
    center: [0, 0],
    tasks: [],
    mounted: false,
    zoom: 13,
    empty: true,
    show: false,
    curLocations: []
  };

  componentDidMount() {
    let newTasks = [];
    const userInfoData = JSON.parse(sessionStorage.getItem("userInfo"));
    const userID = userInfoData._id;
    axios
      .get("/task/getByCan/?_id=" + userID)
      .then(response => {
        const data = response.data;
        const length = data.length;
        for (let i = 0; i < length; i++) {
          newTasks.push(data[i]);
        }
        if (newTasks.length == 0) {
          this.setState({ mounted: true });
        } else {
          this.setState({ mounted: true, empty: false });
        }
        this.setState({
          tasks: newTasks
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
      if (task.num == e.num) {
        task.selected = true;
      } else {
        task.selected = false;
      }
    });
    let newLocations = this.state.curLocations;
    newLocations.push(e.num);
    this.setState({ tasks: newTasks, curLocations: newLocations });
  };

  handleView = e => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  };
  render() {
    let keyForLoc = 0;
    let locations = (
      <div>
        {this.state.curLocations.map(location => (
          <div key={keyForLoc++}>{location}</div>
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
            {/*this.state.tasks.map(pos => (
        <Marker key={pos.id} position={pos} />
      ))*/}
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
                  key={task.num}
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
}

export default Upcomingtasks;
