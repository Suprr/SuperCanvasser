import React, { Component } from "react";
import "./ManageUsersCSS.css";
class AddUser extends Component {
  state = {
    userID: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: ""
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  render() {
    const textField = (
      <input
        className="border-top-0 border-right-0 border-left-0 float-right"
        type="text"
      />
    );
    return (
      <div className="nest">
        <h1>AddUser</h1>
        <form className="heading mt-3 add-user-box nest">
          <p>User ID {textField}</p>
          <p>Password {textField}</p>
          <p>Confirm Password {textField}</p>
          <p>
            Name
            <input
              onChange={this.handleNameChange}
              className="border-top-0 border-right-0 border-left-0 float-right"
              type="text"
            />
          </p>
          <p>
            Role
            <input
              onChange={this.handleRoleChange}
              className="border-top-0 border-right-0 border-left-0 float-right"
              type="text"
            />
          </p>
        </form>
        <button
          onClick={() => this.props.onAdd(this.state.role, this.state.name)}
          className="btn btn-light border-danger"
        >
          Add
        </button>
      </div>
    );
  }
}

export default AddUser;
