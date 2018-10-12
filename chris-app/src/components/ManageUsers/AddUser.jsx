import React, { Component } from "react";
import "./ManageUsersCSS.css";
class AddUser extends Component {
  state = {
    userID: "",
    pass: "",
    confirmPass: "",
    name: "",
    role: ""
  };

  render() {
    const textField = (
      <input
        className="border-top-0 border-right-0 border-left-0 float-right"
        type="text"
      />
    );
    return (
      <div className="heading">
        <h1>AddUser</h1>
        <form className="heading mt-3 add-user-box">
          <p className="nest">User ID {textField}</p>
          <p>Password {textField}</p>
          <p>Confirm Password {textField}</p>
          <p>Name {textField}</p>
          <p>Role {textField}</p>
          <button className="btn btn-light border border-danger add-btn">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddUser;
