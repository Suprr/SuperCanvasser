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

  handleAdd = (role, name) => {
    const user = {
      id: this.newUniqueId(this.state.users),
      identity: -1,
      name: ""
    };
    if (role === "Manager") {
      user.identity = 0;
    } else if (role === "Canvasser") {
      user.identity = 1;
    } else if (role === "SysAdmin") {
      user.identity = 2;
    }
    user.name = name;
    this.setState({ users: this.state.users.concat([user]) });
  };

  newUniqueId(users) {
    let highestNum = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id > highestNum) {
        highestNum = users[i].id;
      }
    }
    return ++highestNum;
  }

  handleEdit = () => {};
  render() {
    return (
      <div>
        <h1>Manage Users</h1>
        <div className="spacing" />
        <AddUser onAdd={this.handleAdd} />
        <div className="spacing" />
        <Users
          users={this.state.users}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default ManageUsers;
