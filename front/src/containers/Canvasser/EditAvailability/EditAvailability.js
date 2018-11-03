import React, { Component } from "react";
import Availability from "../../../components/Campaign/AssignTask/Availability";

class EditAvailability extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Edit Availability</h1>
        <Availability canvasser={this.state.selectedCanvasser} />
      </div>
    );
  }
}

export default EditAvailability;
