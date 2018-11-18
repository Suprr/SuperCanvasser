import React,{Component} from 'react';
import classes from './SignInBody_n.module.css';
import axios from '../../axios'
import {Redirect, withRouter} from 'react-router-dom'
class Role extends Component{
	//0 : M, 1 : C, 2 : SA

	state={
		options :null,
		selectedRole : null,
		loading:true
	}

	
	
	onSubmitHandler = (event) =>{
		console.log(['onSubmitHandler']);
		let roleName = null
		let role = this.state.selectedRole;
		
		if(role=='MANAGER')
			roleName = 'manager'
		else if(role=='CANVASSER')
			roleName='canvasser'
		else
			roleName='sysad'
		
		const selectedRole = {
        	role : this.state.selectedRole,
    	}
		//Real Login
		
		axios.get('/login/role/?role='+this.state.selectedRole).then(response=>{
				console.log(role, roleName)
						//12 is placeholder for URL ID, I will fix it
				this.props.history.push('/'+roleName)
		}).catch(error=>{
			console.log('Error',this.state.selectedRole);
			console.log("Error", error);
		})
		
	}

	setRole = (event) =>{
		console.log(['setRole'], event.target.value);
		this.setState({selectedRole : event.target.value})
	}

	componentDidMount(){
		//get roles from the server.
		const data = JSON.parse(sessionStorage.getItem('userInfo'));
		//const data = sessionStorage.getItem('userInfo');
		this.setState({options:data.role});
	}

	render(){
		//console.log('[SignInBody]',this.props);
		const roles = this.state.options? this.state.options.map(role=>{
			let roleName = null;
			if(role=='MANAGER')
				roleName='Manager'
			else if(role=='CANVASSER')
				roleName='Canvasser'
			else
				roleName='System Admin'

			let r = <div key={role} className={classes.RoleItem}><input type='radio' value = {role} name='role'/>{roleName}</div>
			return r
		}) : null;
		
		return (
			<div className={[classes.SignInBody, "container", "text-center"].join(' ')}> 
				<h1 className = {classes.Title}>Select Role</h1>

				<div className = {classes.RoleSection} onChange={this.setRole.bind(this)}>
					{roles}
				</div>

				<button className = {["btn","btn-dark", classes.SignInBtn].join(' ')} onClick={this.onSubmitHandler}> Submit </button>
			</div>

		);
	}
}

export default withRouter(Role);