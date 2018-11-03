import React, { Component } from "react";
import "./ManageUsersCSS.css";
import axios from '../../../axios'
class AddUser extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName : "",
    role: ""
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  handleOnChange =(event) =>{
     const target = event.target;
     const value = target.value;
     const name = target.name;
      
     this.setState({[name]: value });
  }



  handleSubmit =(event) =>{

    const userInfo = {
            email : this.state.email,
            pwd: this.state.password,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            role : [this.state.role]
    }
    
    axios.post( '/sysad/add', userInfo)
        .then( response => {
          //sessionStorage.setItem('userInfo', JSON.stringify(response.data));
          console.log(['AddUser'],response.data, "DONE");

          // this.props.history.push('/login/role/');
        
        } )
        .catch( error => {
            console.log("Error", error, userInfo);
        });
  }

  render() {
    // const textField = (
    //   <input
    //     className="border-top-0 border-right-0 border-left-0 float-right"
    //     type="text"
    //   />

    // <button
    //       onClick={() => this.props.onAdd(this.state.role, this.state.name)}
    //       className="btn btn-light border-danger"
    //     >
      
    // );
    return (
      <div className="nest">
        <h1>Add User</h1>
        <div className="heading mt-3 add-user-box nest">
          <div>Email <input onChange={this.handleOnChange} name='email' value={this.state.email}/></div>
          <div>Password <input onChange={this.handleOnChange} name='password' value={this.state.password}/></div>
          <div>Confirm Password <input onChange={this.handleOnChange} name='confirmPassword' value={this.state.confirmPassword}/></div>
          <div>
            First Name
            <input
              onChange={this.handleOnChange}
              name='firstName'
              value={this.state.firstName}
              className="border-top-0 border-right-0 border-left-0 float-right"
             
            />
          </div>
          <div>
            Last Name
            <input
              onChange={this.handleOnChange}
              name='lastName'
              value={this.state.lastName}
              className="border-top-0 border-right-0 border-left-0 float-right"
              
            />
          </div>
          <div>
            Role
            <input
              onChange={this.handleOnChange}
              className="border-top-0 border-right-0 border-left-0 float-right"
              name='role'
              value={this.state.role}
              
            />
          </div>
        </div>
        <button
          onClick={this.handleSubmit}
          className="btn btn-light border-danger"
        >
          Add
        </button>
      </div>
    );
  }
}

export default AddUser;
