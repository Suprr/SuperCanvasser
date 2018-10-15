import React, { Component } from "react";
import AddUser from "./AddUser";
import Users from "./Users";
import axios from "../../../axios";

class ManageUsers extends Component {
  state = {
    variablesFromServer: []
  };

  componentDidMount() {
    this.handleUpdateUsers();
  }

  handleUpdateUsers = () => {
    console.log("componentDidMount ManageUsers");
    let x = null;
    axios
      .get("https://cse308-de3df.firebaseio.com/users.json")
      .then(response => {
        x = response.data;

        if (x != null) {
          console.log(x);
          let newVariables = [];
          for (let i in response.data) {
            if (x[i] != null) {
              newVariables.push(x[i]);
            }
          }
          console.log("variablesFromServer", newVariables);
          this.setState({ variablesFromServer: newVariables });
        }
      });
  };

  handleDelete = userID => {
    console.log(userID);
    axios
      .delete("/users/" + userID.id + ".json/", userID)
      .then(response => {
        this.handleUpdateUsers();
        console.log("delete user success");
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  handleAdd = (role, name) => {
    const user = {
      id: this.newUniqueId(this.state.users),
      value: -1,
      name: ""
    };
    if (role === "Manager") {
      user.value = 0;
    } else if (role === "Canvasser") {
      user.value = 1;
    } else if (role === "SysAdmin") {
      user.value = 2;
    }
    user.name = name;
    axios
      .put("/users/" + user.id + ".json/", user)
      .then(response => {
        this.handleUpdateUsers();
        console.log("delete user success");
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  newUniqueId(users) {
    let highestNum = 0;
    for (let i = 0; i < this.state.variablesFromServer.length; i++) {
      if (this.state.variablesFromServer[i].id > highestNum) {
        highestNum = this.state.variablesFromServer[i].id;
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
          users={this.state.variablesFromServer}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onUpdate={this.handleUpdateUsers}
        />
      </div>
    );
  }
}

export default ManageUsers;
