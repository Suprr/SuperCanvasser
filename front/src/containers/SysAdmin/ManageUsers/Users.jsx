import React, { Component } from "react";
import User from "./User";
import "./ManageUsersCSS.css";

class Users extends Component {
  state = {
    userDisplay: ""
  };

  switchDisplay = userDisplay => {
    this.setState({ userDisplay });
  };
  componentDidMount(){
    console.log(['USERS'],this.props)
  }
  render() {

    console.log(['USERSRender'],this.props)
    const { onDelete } = this.props;
    const buttonClass = "btn border border-danger btn-group";
    const display = this.state.userDisplay == "MANAGER"? this.props.managers.map(user => (
                <User key={user._id} user={user} onDelete={onDelete} />
              ))
            : this.state.userDisplay == "CANVASSER"? this.props.canvassers.map(user => (
                <User key={user._id} user={user} onDelete={onDelete} />
              )) : this.state.userDisplay == "ADMIN"? this.props.sysAdmins.map(user => (
                <User key={user._id} user={user} onDelete={onDelete} />
              )) : null;
            
    return (
      <div className="nest">
        <h1>Users</h1>
        <button onClick={() => this.switchDisplay("MANAGER")} className={buttonClass}>
          Managers
        </button>
        <button onClick={() => this.switchDisplay("CANVASSER")} className={buttonClass}>
          Canvassers
        </button>
        <button onClick={() => this.switchDisplay("ADMIN")} className={buttonClass}>
          System Admins
        </button>
        <div className="nest">
          {
            display
          }
        </div>
      </div>
    );
  }
}

export default Users;
