import React, { Component } from "react";
import "./ManageUsersCSS.css";
import axios from '../../../axios'
import {withRouter} from 'react-router-dom'
import classes from './ManageUsers.module.css'
import MessageBox from '../../../components/UI/MessageBox/MessageBox'

class AddUser extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName : "",
    manager : false,
    canvasser : false,
    sysad : false,
    show : false,
    message : ''
  }

  handleOnChange =(event) =>{
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;
      
     this.setState({[name]: value });
  }

  showMessageBox = (message) => {
    this.setState({ show: true , message : message});
  }

  closeMessageBox = () => {
    this.setState({ show: false });
  }

  handleSubmit = (event) =>{


   const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
   const emailValidation = pattern.test(this.state.email);
   const passwordMatching = (this.state.password==this.state.confirmPassword);
   if(!emailValidation){
      //error
      this.showMessageBox('Invalid Email Form');
   } else if(this.state.password==''||this.state.confirmPassword==''){
      this.showMessageBox('Type Password please.');
   } else if(!passwordMatching){
     this.showMessageBox('Password is not matched');
   } else if(this.state.firstName==""){
     this.showMessageBox('First Name is empty');
   } else if(this.state.lastName==""){
     this.showMessageBox('Last Name is empty');
   } else if(!this.state.manager&&!this.state.canvasser&&!this.state.sysad){
     this.showMessageBox('Choose At Least One Role');
   } else{
      console.log('Valid')
      
      let newRole = [];
      if(this.state.manager){
        newRole.push('MANAGER')
      } 
      if(this.state.canvasser){
        newRole.push('CANVASSER')
      }
      if(this.state.sysad){
        newRole.push('ADMIN')
      }

      const userInfo = {
            email : this.state.email,
            pwd: this.state.password,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            role : newRole
      }

      axios.post( '/sysad/add', userInfo)
        .then( response => {
          //sessionStorage.setItem('userInfo', JSON.stringify(response.data));
          // console.log(['AddUser'],response.data, "DONE");
          this.showMessageBox('A User Is Created.');
          this.props.refresh();
          this.setState({
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName : "",
            manager : false,
            canvasser : false,
            sysad : false
          });
          
        } )
        .catch( error => {
            this.showMessageBox('There might be NETWORK ERROR.');
        });
   }


    
  }

  render() {

    return (
      <div className="nest">
        <MessageBox show={this.state.show} modalClosed={this.closeMessageBox} message={this.state.message}/>

        <h1>Add User</h1>
         <div className={classes.AddUserBox}>
          <div className={['row',classes.InputSection].join(' ')}>
            <div className={[classes.InputName, 'col-3'].join(' ')}>
              Email
            </div> 
            <div className={[classes.Input, 'col-6'].join(' ')}>
              <input onChange={this.handleOnChange} name='email' value={this.state.email}/>
            </div>
          </div>
          
          <div className={['row',classes.InputSection].join(' ')}>
            <div className={[classes.InputName, 'col-3'].join(' ')}>
              Password
            </div> 
            <div className={[classes.Input, 'col-6'].join(' ')}>
              <input onChange={this.handleOnChange} name='password' value={this.state.password}/>
            </div>
          </div>
           
           <div className={['row',classes.InputSection].join(' ')}>
            <div className={[classes.InputName, 'col-3'].join(' ')}>
              Check Password
            </div> 
            <div className={[classes.Input, 'col-6'].join(' ')}>
             <input onChange={this.handleOnChange} name='confirmPassword' value={this.state.confirmPassword}/>
            </div>
          </div>


          <div className={['row',classes.InputSection].join(' ')}>
            <div className={[classes.InputName, 'col-3'].join(' ')}>
              First Name
            </div> 
            <div className={[classes.Input, 'col-6'].join(' ')}>
              <input
                onChange={this.handleOnChange}
                name='firstName'
                value={this.state.firstName}
              />
            </div>
          </div>


           <div className={['row',classes.InputSection].join(' ')}>
              <div className={[classes.InputName, 'col-3'].join(' ')}>
                Last Name
              </div> 
              <div className={[classes.Input, 'col-6'].join(' ')}>
                <input
                  onChange={this.handleOnChange}
                  name='lastName'
                  value={this.state.lastName}
                />
            </div>
          </div>

         <div className={['row',classes.InputSection].join(' ')}>
            <div className={[classes.InputName, 'col-3'].join(' ')}>
                Role
            </div> 

            <div className={[classes.CheckBoxSection, 'col-2'].join(' ')}>
               <label>
                Manager 
                <input
                  className={classes.CheckBox}
                  name="manager"
                  type="checkbox"
                  checked={this.state.manager}
                  onChange={this.handleOnChange} />
              </label>
            </div>

             <div className={[classes.CheckBoxSection, 'col-2'].join(' ')}>
               <label>
                Canvasser 
                <input
                  className={classes.CheckBox}
                  name="canvasser"
                  type="checkbox"
                  checked={this.state.canvasser}
                  onChange={this.handleOnChange} />
              </label>
            </div>

             <div className={[classes.CheckBoxSection, 'col-2'].join(' ')}>
               <label>
                Admin 
                <input
                  className={classes.CheckBox}
                  name="sysad"
                  type="checkbox"
                  checked={this.state.sysad}
                  onChange={this.handleOnChange} />
              </label>
            </div>

            
        </div>

        </div>
        <div className={[classes.BtnSection, 'col-9'].join(' ')}>
          <button onClick={this.handleSubmit} className={['btn', 'btn-danger', classes.Btn].join(' ')}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddUser);
