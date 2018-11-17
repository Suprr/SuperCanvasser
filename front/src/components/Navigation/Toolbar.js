import React, {Component} from 'react';
import classes from './nav.module.css'
import {Redirect, withRouter} from 'react-router-dom'
import axios from '../../axios'
class Toolbar extends Component {

	state = {
		roles : null,
		showDropdown : false
	}

	signOutHandler = () =>{
		sessionStorage.setItem('userInfo', null);
		this.props.history.push('/login');
	}

	componentDidMount(){
		const data = JSON.parse(sessionStorage.getItem('userInfo'));
		this.setState({roles:data.role});

	}

	clickRoleHandler=()=>{
		this.setState((prevState)=>({showDropdown : !prevState.showDropdown}));
		//this.setState({showDropdown:!this.state.showDropdown})
		//console.log(this.state.showDropdown);
	}

	changeRoleHandler=(role)=>{
		
		let roleName = null;
		// const role = event.target.name
		if(role=='MANAGER')
			roleName = 'manager'
		else if(role=='CANVASSER')
			roleName='canvasser'
		else
			roleName='sysad'
		//console.log('ChangeRoleHadler',role)
		axios.get('/login/role/?role='+role).then(response=>{
				this.setState({showDropdown:false},()=>{
					this.props.history.push('/'+roleName)
				});
				
		}).catch(error=>{
			console.log('Error',this.state.selectedRole);
			console.log("Error", error);
		})
	}

	render(){
		//let dropdown = this.state.roles? <Dropdown resetThenSet = {this.dropDownHandler} title = {'Choose A Campaigin'} list = {this.props.roles} />:null;
		console.log('role :', this.state.roles);
		const dropDown = this.state.roles? 
			this.state.roles.map(role=>{
				let roleName = null;

				if(role=='MANAGER')
					roleName='Manager'
				else if(role=='CANVASSER')
					roleName='Canvasser'
				else
					roleName='System Admin'

				let r = <li key={role} name={role} onClick={this.changeRoleHandler.bind(this, role)}className={[classes.roleItem].join(' ')}>{roleName}</li>
				return r;
			}) :null;

		return <div className={classes.Toolbar}>
						
						<div className="row">
							<div className = {[classes.TitleSection, "col-3"].join(' ')}>
								<div> Super Canvasser</div>
							</div>
							<div className = {[classes.OtherSection, "col-9", "row", "justify-content-end"].join(' ')}>
									<div className = {[classes.OtherItem].join(' ')}> {this.props.user.firstName + " "+ this.props.user.lastName}</div>
									<div className = {[classes.OtherItem].join(' ')}> / </div>
									<div className = {[classes.OtherItem].join(' ')}> 
										<div onClick={this.clickRoleHandler}>{this.props.role}</div>
										<div className={[classes.RoleDropDown, this.state.showDropdown?classes.Visible : classes.Invisible].join(' ')}>
											<ul >
												{dropDown}
											</ul>
										</div>
									</div>
									<div className = {[classes.OtherItem].join(' ')}><div onClick={this.signOutHandler}>Sign Out</div></div>
							</div>
						</div>
				
				</div>
	}

}

export default withRouter(Toolbar);