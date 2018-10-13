import React, {Component} from 'react'
import classes from './Campaign.module.css'
import {Link} from 'react-router-dom'
class Campaign extends Component{
	state ={
		...this.props.campaign
	}

	render(){
		console.log('Campaign : url, '+this.props.url+ ' key : '+ this.props.id);
		return(

			<div className = {["card", classes.Campaign].join(' ')}>
				<div className={["card-body"].join(' ')}>
					<h5 className="card-title">{this.state.title}</h5>
					
					<div className={["container-fluid", classes.CampaignBody].join(' ')}>
						<div className="row">
							<div className="col-5">
								<p>Start</p>
								<p>End</p>
							</div>
							<div className="col-7">
								<p>{this.state.startDate}</p>
								<p>{this.state.endDate}</p>
							</div>
						</div>
					</div>

					<div>
						<Link className={classes.Link} to={this.props.url+'/'+this.props.id+'/'+this.props.name}>
						<button name = {this.props.name} className = {["btn btn-danger"].join(' ')}>
								
									View
								
						</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Campaign;