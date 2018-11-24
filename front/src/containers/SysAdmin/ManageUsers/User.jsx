import React, { Component } from "react";
import RemoveIcon from '../../../assets/images/minus.png'
import classes from './ManageUsers.module.css'
class User extends Component {
  state = {};
  render() {
    return (
      <div className={[classes.UserItem, "d-flex","edit-row"].join(' ')}>
        <span>{this.props.user.firstName+" "+this.props.user.lastName}</span>
        <div className="ml-auto">
          <input type='image' src={RemoveIcon} className={classes.RemoveBtn} onClick={() => this.props.onDelete(this.props.user._id)}/>
        </div>
      </div>
    );
  }

  updateUserList() {}
}

export default User;
