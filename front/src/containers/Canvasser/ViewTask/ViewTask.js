import React, { Component } from "react";
import Task from "./Task";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "../../../axios";
import Modal from "./QModal";
import QuestionnaireList from "../../../components/Campaign/ViewCampaign/QuestionnaireList";

class ViewTask extends Component {
  state = {
    nextLoc: {},
    locations: [],
    visitedLoc: [],
    positions: [],
    zoom: 13,
    show: true,
    questions: null
  };

  componentDidMount() {
    //get addresses for task from backend
    //examples of locations
    const addresses = [
      {
        number: "142",
        street: "Main Street",
        unit: "",
        city: "Setauket",
        state: "NY",
        zipcode: "11733"
      },
      {
        number: "67",
        street: "North Columbia Street",
        unit: "",
        city: "Port Jefferson",
        state: "NY",
        zipcode: "11777"
      }
    ];
    for (let i = 0; i < addresses.length; i++) {
      let address = addresses[i];
      let loc =
        address.number +
        ", " +
        address.street +
        ", " +
        address.unit +
        ", " +
        address.city +
        ", " +
        address.state +
        ", " +
        address.zipcode;

      const addressx =
        address.number +
        "+" +
        address.street.split(" ").join("+") +
        "%2C+" +
        address.unit.split(" ").join("+") +
        "%2c+" +
        address.city.split(" ").join("+") +
        "%2c+" +
        address.state +
        "+%2c+" +
        address.zipcode.split(" ").join("+");
      axios
        .get(
          `${"https://cors-anywhere.herokuapp.com/"}https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=` +
            addressx +
            `&benchmark=9&format=json`
        )
        .then(res => {
          const addressMatch = res.data.result.addressMatches[0];
          const long = addressMatch.coordinates.x;
          const lat = addressMatch.coordinates.y;

          const newLocation = {
            latitude: lat,
            longitude: long,
            number: address.number,
            street: address.street,
            city: address.city,
            zipcode: address.zipcode,
            qNa: {},
            id: this.state.locations.length,
            _id: "",
            index: -1,
            anonymous: false,
            visited: false
          };

          console.log("Add Location", newLocation);
          const coords = [newLocation.latitude, newLocation.longitude];
          this.setState(prevState => ({
            locations: [...prevState.locations, newLocation],
            positions: [...prevState.positions, coords],
            newLocation: ""
          }));
          if (i == 0) {
            this.setState({ nextLoc: newLocation });
          }
        })
        .catch(err => {
          console.log(["addLocationHandler Err"], err);
        });
    }
  }

  modalCloseHandler = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <Modal show={this.state.show} modalClosed={this.modalCloseHandler}>
          <QuestionnaireList questionnaire={this.state.questions} />
        </Modal>
        <h1>View Task</h1>
        <div className="nest">
          <h2>Nov 11, 2018</h2>
          <Map center={this.state.positions[0]} zoom={this.state.zoom}>
            <TileLayer
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {this.state.positions.map(pos => (
              <Marker position={pos} />
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
  }
}

export default ViewTask;
