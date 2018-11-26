import React, { Component } from "react";
import Calendar from "../../../components/UI/Calendar/Calendar";
import axios from "../../../axios";

class EditAvailability extends Component {
  state = {
    inAvailableDates: [],
    mounted: false,
    availData: {
      availabilityDates: []
    }
  };

  onCalendarClick = e => {
    let newInavDates = this.state.inAvailableDates;
    let bool = false;
    for (let i = 0; i < newInavDates.length; i++) {
      if (newInavDates[i].toString() === e.toString()) {
        bool = true;
        newInavDates.splice(i, 1);
      }
    }
    if (!bool) {
      newInavDates.push(e);
    }

    this.correctInvalidDates();
    let newAvailData = this.state.availData;
    newAvailData.availabilityDates = newInavDates;
    this.setState({ inAvailableDates: newInavDates, availData: newAvailData });

    axios.post("/avail/edit", this.state.availData);
  };

  componentDidMount() {
    const userInfoData = JSON.parse(sessionStorage.getItem("userInfo"));
    const userID = userInfoData._id;
    axios
      .get("/avail/get/?_id=" + userID)
      .then(response => {
        this.setState({
          availData: response.data,
          inAvailableDates: response.data.availabilityDates
        });
      })
      .catch(error => {
        console.log("USER ID Error", userID);
        console.log(error);
      });
    this.setState({ mounted: true });
  }

  correctInvalidDates() {
    const todayDate = new Date();
    let tempInavailDates = this.state.inAvailableDates;
    for (let i = 0; i < tempInavailDates.length; i++) {
      if (tempInavailDates[i] < todayDate) {
        tempInavailDates.splice(i, 1);
      }
    }
    this.setState({ inAvailableDates: tempInavailDates });
  }

  render() {
    return (
      <div>
        <h1>Edit Availability</h1>
        {
          <Calendar
            onClick={this.onCalendarClick}
            inavailable={this.state.inAvailableDates}
          />
        }
      </div>
    );
  }
}

export default EditAvailability;
