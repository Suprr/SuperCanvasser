import React, {Component} from 'react';
import classes from './nav.module.css'

class Toolbar extends Component {

	render(){
		return <div className={classes.Toolbar}>
					
						<div className="row">
							<div className = {[classes.TitleSection, "col-3"].join(' ')}>
								<div> Super Canvasser</div>
							</div>
							<div className = {[classes.OtherSection, "col-9", "row", "justify-content-end"].join(' ')}>
									<div className = {[classes.OtherItem].join(' ')}> {this.props.user.userID}</div>
									<div className = {[classes.OtherItem].join(' ')}> / </div>
									<div className = {[classes.OtherItem].join(' ')}> {this.props.user.role}</div>
									<div className = {[classes.OtherItem].join(' ')}>Sign Out</div>
								
							</div>
						</div>
				
				</div>
	}

}

export default Toolbar;