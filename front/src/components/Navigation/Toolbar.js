import React, {Component} from 'react';
import classes from './nav.module.css'
import {Redirect, withRouter} from 'react-router-dom'

class Toolbar extends Component {

	signOutHandler = () =>{
		sessionStorage.setItem('userInfo', null);
		this.props.history.push('/login');
	}

	render(){
		return <div className={classes.Toolbar}>
						<div className="row">
							<div className = {[classes.TitleSection, "col-3"].join(' ')}>
								<div> Super Canvasser</div>
							</div>
							<div className = {[classes.OtherSection, "col-9", "row", "justify-content-end"].join(' ')}>
									<div className = {[classes.OtherItem].join(' ')}> {this.props.user.firstName + " "+ this.props.user.lastName}</div>
									<div className = {[classes.OtherItem].join(' ')}> / </div>
									<div className = {[classes.OtherItem].join(' ')}> {this.props.role}</div>
									<div className = {[classes.OtherItem].join(' ')}><div onClick={this.signOutHandler}>Sign Out</div></div>
							</div>
						</div>
				
				</div>
	}

}

export default withRouter(Toolbar);