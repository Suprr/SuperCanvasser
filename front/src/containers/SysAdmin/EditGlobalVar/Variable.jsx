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
      type: this.props.variable.type,
      _id: this.props.variable._id,
      value: this.state.newValue
    };

    console.log(["HANDLE EDIT"], newVariable);
    axios
      .post("/sysad/var/edit", newVariable)
      .then(response => {
        console.log(["handleEdit"], "Done");
      })
      .catch(error => {
        console.log("Error", error);
      });
    // axios.put('/global-variable/'+this.props.variable._id+'.json/',newVariable).then( response => {

    //   console.log("edit gbv success");

    // })
    // .catch( error => {
    //     console.log("Error", error);
    // });
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
