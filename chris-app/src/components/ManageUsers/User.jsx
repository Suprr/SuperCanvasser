import React, { Component } from "react";
class User extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex edit-row">
        <span>{this.props.user.name}</span>
        <div className="ml-auto">
          <button
            onClick={() => this.props.onDelete(this.props.user.id)}
            className="btn-circle"
          >
            -
          </button>
          <button
            onClick={() => this.props.onIncrement(this.props.user)}
            className="btn btn-danger"
          >
            edit
          </button>
        </div>
      </div>
    );
  }

  updateUserList() {}
}

export default User;
