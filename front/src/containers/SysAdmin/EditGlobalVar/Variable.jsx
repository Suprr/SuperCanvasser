import React, { Component } from "react";

import axios from "../../../axios";
class Variable extends Component {
  state = {
    newValue: 0
  };
  handleVarChange = e => {
    this.setState({ newValue: e.target.value });
  };

  handleEdit = event => {
    let newVariable = {
      name: this.props.variable.name,
      id: this.props.variable.id,
      value: this.state.newValue
    };
    axios
      .put("/global-variable/" + this.props.variable.id + ".json/", newVariable)
      .then(response => {
        console.log("edit gbv success");
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className="row var-row nest">
        <div className="col-sm">
          <span>{this.props.variable.name}</span>
        </div>
        <div className="col-sm">
          <input
            onChange={this.handleVarChange}
            className="border-top-0 border-right-0 border-left-0"
            type="text"
            defaultValue={this.props.variable.value}
          />
        </div>
        <div className="col-sm">
          <button
            onClick={event => this.handleEdit(event)}
            className="btn btn-danger"
          >
            edit
          </button>
        </div>
      </div>
    );
  }
}

export default Variable;
