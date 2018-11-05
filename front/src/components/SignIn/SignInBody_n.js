import React,{Component} from 'react';
import Dropdown from 'react-dropdown';
import classes from './SignInBody_n.module.css';
import axios from '../../axios'
import {Redirect, withRouter} from 'react-router-dom'
class SignInBody_n extends Component{
	
	state={
		userID : null,
		password : null,
		loading:true
	}
	
	onSubmitHandler = (event) =>{
		event.preventDefault();
        const formData = {};

        const loginInfo = {
            email : this.state.userID,
            pwd: this.state.password,
        }
        
        axios.post( '/login', loginInfo)
            .then( response => {
            	sessionStorage.setItem('userInfo', JSON.stringify(response.data));
       			console.log(['SignInBody_n'],response.data);
       			this.props.history.push('/login/role/');
       			
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
					
					<input className = {["btn","btn-dark", classes.SignInBtn].join(' ')} type="submit" value = "Sign In"/>
				</form>
			</div>

		);
	}
}

export default withRouter(SignInBody_n);