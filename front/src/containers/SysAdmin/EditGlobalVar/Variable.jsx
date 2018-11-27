import React, { Component } from "react";

import axios from "../../../axios";

class Variable extends Component {
  state = {
    newValue: this.props.variable.value,
    originalValue : this.props.variable.value
  };

  handleVarChange = e => {
    var regex = /([0-9]+)/;
    var value = e.target.value;
    var matches = value.match(regex);

    if(matches){
      this.setState({ newValue: e.target.value });
    } else{
      this.setState({ newValue: this.state.originalValue}, this.props.showMessageBox('The value must be Decmial or Integer'));
    }
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
          <span>{this.props.variable.type}</span>
        </div>
        <div className="col-sm">
          <input
            onChange={this.handleVarChange}
            pattern="(\d*\.)?\d+"
            className="border-top-0 border-right-0 border-left-0"
            type="text"
            name = "gvalue"
            value = {this.state.newValue}
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
