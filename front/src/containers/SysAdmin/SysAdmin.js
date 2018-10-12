import React, { Component } from "react";
import EditGV from "./EditGlobalVar/EditGlobalVar";
import ManageUsers from "./ManageUsers/ManageUsers";

class SysAdmin extends Component {
  state = {};
  render() {
    return (
      <div>
        <ManageUsers />
      </div>
    );
  }
}

export default SysAdmin;
