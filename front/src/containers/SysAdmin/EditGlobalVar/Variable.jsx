import React, { Component } from "react";
class Variable extends Component {
  state = {};
  render() {
    return (
      <div className="row var-row nest">
        <div className="col-sm">
          <span>{this.props.variable.name}</span>
        </div>
        <div className="col-sm">
          <input
            className="border-top-0 border-right-0 border-left-0"
            type="text"
            defaultValue={this.props.variable.value}
          />
        </div>
        <div className="col-sm">
          <button className="btn btn-danger">edit</button>
        </div>
      </div>
    );
  }
}

export default Variable;
