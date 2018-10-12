import React, { Component } from "react";
import AddUser from "./AddUser";
import Users from "./Users";
class ManageUsers extends Component {
  state = {
    users: [
      { id: 1, identity: 0, name: "man" },
      { id: 2, identity: 0, name: "a" },
      { id: 3, identity: 0, name: "ger" },
      { id: 4, identity: 1, name: "can" },
      { id: 5, identity: 1, name: "vass" },
      { id: 6, identity: 1, name: "er" },
      { id: 7, identity: 2, name: "sys" },
      { id: 8, identity: 2, name: "ad" },
      { id: 9, identity: 2, name: "min" }
    ]
  };

  handleDelete = userID => {
    const users = this.state.users.filter(c => c.id !== userID);
    this.setState({ users });
  };

  render() {
    return (
      <div>
        <h1>Manage Users</h1>
        <AddUser />
        <Users users={this.state.users} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default ManageUsers;
