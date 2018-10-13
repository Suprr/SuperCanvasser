import React,{Component} from 'react';
import Dropdown from 'react-dropdown';
import classes from './SignInBody.module.css';
import axios from '../../axios'
import {Redirect, withRouter} from 'react-router-dom'
class SignInBody extends Component{
	
	state={
		options : ['Manager', 'Canvasser', 'System Admin'],
		userID : null,
		password : null,
		role : null,
		loading:true
	}
	
	onSubmitHandler = (event) =>{
		event.preventDefault();
        const formData = {};

        const loginInfo = {
            userID : this.state.userID,
            password: this.state.password,
            role: this.state.role
        }
        
        axios.post( '/login.json', loginInfo )
            .then( response => {
           		console.log("Loginned", loginInfo);
           		//this.props.signedIn(loginInfo);
           		let role = null;
		        if(this.state.role=='Manager'){
		        	role = 'manager';
		        }else if(this.state.role=='Canvasser'){
		        	role = 'canvasser';
		        } else{
		        	role = 'sys-admin';
		        }

       			this.props.history.push('/'+role+'/'+this.state.userID);

            } )
            .catch( error => {
                console.log("Error", error);
            });
	}

	render(){
		//console.log('[SignInBody]',this.props);
		return (
			<div className={[classes.SignInBody, "container", "text-center"].join(' ')}> 
				
				<h1 className = {classes.Title}>Sign In </h1>

				<form className={"form-signin"} onSubmit = {this.onSubmitHandler}>
					<div className= {[classes.InputTextWrapper,"text-center","form-group"].join(' ')}>
						<input 
							className = {[classes.FormControl].join(' ')}
							placeholder = "User ID" 
							onChange={(event) => this.setState({userID: event.target.value})}/>
					</div>
					
					<div className= {[classes.InputTextWrapper,"text-center","form-group"].join(' ')}>
						<input 
							className = {[classes.FormControl].join(' ')}
							placeholder = "password"
							onChange={(event) => this.setState({password: event.target.value})}/>
					</div>
					
					<div className = {"form-group"}>
						<Dropdown 
						 placeholderClassName ="dropdown-toggle"
						 className = {[classes.Dropdown].join(' ')}
					     options = {this.state.options}
					     placeholder="Role"
					     value={this.state.role?this.state.role:'Role'}
						 onChange={(event) => this.setState({role:event.value})}/>
					 </div>
					
					<input className = {["btn","btn-dark", classes.SignInBtn].join(' ')} type="submit" value = "Sign In"/>
				</form>
			</div>

		);
	}
}

export default withRouter(SignInBody);