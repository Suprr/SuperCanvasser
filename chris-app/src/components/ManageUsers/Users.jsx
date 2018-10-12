import React, { Component } from "react";
import User from "./User";
import "./ManageUsersCSS.css";

class Users extends Component {
  state = {
    userDisplay: -1
  };

  switchDisplay = userDisplay => {
    this.setState({ userDisplay });
  };

  render() {
    const { onDelete } = this.props;
    const buttonClass = "btn border border-danger btn-group";
    return (
      <div>
        <h1>Users</h1>
        <button onClick={() => this.switchDisplay(0)} className={buttonClass}>
          Managers
        </button>
        <button onClick={() => this.switchDisplay(1)} className={buttonClass}>
          Canvassers
        </button>
        <button onClick={() => this.switchDisplay(2)} className={buttonClass}>
          System Admins
        </button>
        {this.props.users
          .filter(c => c.identity === this.state.userDisplay)
          .map(user => (
            <User key={user.id} user={user} onDelete={onDelete} />
          ))}
      </div>
    );
  }
}

export default Users;
