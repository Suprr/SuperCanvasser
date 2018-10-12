<<<<<<< HEAD
import React, {Component} from 'react'

class SysAdmin extends Component{


	render(){

		return <h1> SysAdmin</h1>;
	}

}

export default SysAdmin;
=======
import React, { Component } from "react";
import EditGV from "./EditGlobalVar/EditGlobalVar";
import ManageUsers from "./ManageUsers/ManageUsers";

class SysAdmin extends Component {
  state = {};
  render() {
    return (
      <div>
        <EditGV />
      </div>
    );
  }
}

export default SysAdmin;
>>>>>>> chris
