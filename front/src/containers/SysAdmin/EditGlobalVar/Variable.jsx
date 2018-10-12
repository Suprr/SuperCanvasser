import React, { Component } from "react";
class Variable extends Component {
  state = {
    newValue: 0
  };
  handleVarChange = e => {
    this.setState({ newValue: e.target.value });
  };
  render() {
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
            conClick={() =>
              this.props.onEdit(this.state.newValue, this.props.variable.id)
            }
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
