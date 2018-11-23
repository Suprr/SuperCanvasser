import React, { Component } from "react";
import Calendar from "../../../components/UI/Calendar/Calendar";

class EditAvailability extends Component {
  state = {
    inAvailableDates: []
  };

  onCalendarClick = e => {
    let newInavDates = this.state.inAvailableDates;
    if (newInavDates.includes(e)) {
      newInavDates.splice(newInavDates.indexOf(e), 1);
    } else {
      newInavDates.push(e);
    }
    this.setState({ inAvailableDates: newInavDates });
    // send inavail dates to backend
  };

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
