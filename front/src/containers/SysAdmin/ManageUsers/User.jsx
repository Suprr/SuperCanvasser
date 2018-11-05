import React, { Component } from "react";
class User extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex edit-row">
        <span>{this.props.user.firstName+" "+this.props.user.lastName}</span>
        <div className="ml-auto">
          <button
            onClick={() => this.props.onDelete(this.props.user._id)}
            className="btn-circle"
          >
            -
          </button>
          <button className="btn btn-danger">edit</button>
        </div>
      </div>
    );
  }

  updateUserList() {}
}

export default User;
