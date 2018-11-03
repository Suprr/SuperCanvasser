import React, { Component } from "react";
import Variable from "./Variable";
import axios from "../../../axios";
class EditGlobalVar extends Component {
  state = {
    variables: null,
    variablesFromServer: [],
    isMounted: false
  };

  handleEdit = (newValue, id) => {
    // const tempVariables = { ...this.state.variables };
    // for (let i = 0; i < this.state.variables.length; i++) {
    //   if (this.state.variables[i].id === id) {
    //     tempVariables[i].value = newValue;
    //     break;
    //   }
    // }
    // this.setState({ variables: tempVariables });
  };

  componentDidMount() {
    console.log(["EditGlobalVar componentDidMount"]);
    //for avoiding update error, I use isMounted value
    this.setState({ isMounted: true }, () => {
      axios
        .get("/sysad/var/view")
        .then(response => {
          const data = response.data;
          const length = data.length;

          let newVariables = [];
          console.log("EditGlobalVar data", data);
          for (let i = 0; i < length; i++) {
            newVariables.push(data[i]);
          }

          console.log("EditGlobalVar newVariables", newVariables);
          if (this.state.isMounted) {
            console.log("EditGlobalVar newVariables", "UPLOADED");
            this.setState({ variables: newVariables });
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  componentWillUnMount() {
    this.setState({ isMounted: false });
  }

  render() {
    return (
      <div>
        <h1>Global Variables</h1>
        <div className="var-list">
          <div className="row nest">
            <div className="col-sm">
              <h4>Variable Names</h4>
            </div>
            <div className="col-sm">
              <h4>Values</h4>
            </div>
            <div className="col-sm" />
          </div>
        </div>
        {this.state.variables
          ? this.state.variables.map(variable => (
              <Variable
                key={variable._id}
                variable={variable}
                onEdit={this.handleEdit}
              />
            ))
          : null}
      </div>
    );
  }
}

export default EditGlobalVar;
