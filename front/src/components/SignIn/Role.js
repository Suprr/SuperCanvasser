import React,{Component} from 'react';
import classes from './SignInBody_n.module.css';
import axios from '../../axios'
import {Redirect, withRouter} from 'react-router-dom'
class Role extends Component{
	//0 : M, 1 : C, 2 : SA

	state={
		options :[0,1,2],
		selectedRole : null,
		loading:true
	}
	
	onSubmitHandler = (event) =>{
		console.log(['onSubmitHandler']);
		let roleName = null
		let role = this.state.selectedRole;
		
		if(role==0)
			roleName = 'manager'
		else if(role==1)
			roleName='canvasser'
		else
			roleName='sys-admin'

		//Real Login
		axios.post('/login/role.json', this.state.selectedRole)
				.then(response => {
						console.log(roleName)
						//12 is placeholder for URL ID, I will fix it
						this.props.history.push('/'+roleName+'/'+'12')
				}).catch(error=>{
					console.log("Error", error);
				});
		
	}

	setRole = (event) =>{
		console.log(['setRole'], event.target.value);
		this.setState({selectedRole : event.target.value})
	}

	componentDidMount(){
		//get roles from the server.
	}

	render(){
		//console.log('[SignInBody]',this.props);
		const roles = this.state.options? this.state.options.map(role=>{
			let roleName = null;
			if(role==0)
				roleName='Manager'
			else if(role==1)
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