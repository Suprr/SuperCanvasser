import React, {Component} from 'react'
import classes from './Campaign.module.css'
import {Link, withRouter} from 'react-router-dom'
class Campaign extends Component{
	state ={
		...this.props.campaign
	}
	viewClickHandler=(event)=>{
		const target = event.target;
		const campaign_id = target.name;

		this.sessionsessionStorage.setItem('campaignID', campaign_id);
		this.props.history.push('/manager/campaign/view');
	}

	render(){
						//<Link className={classes.Link} to={this.props.url+'/view'}>
		return(

			<div className = {["card", classes.Campaign].join(' ')}>
				<div className={["card-body"].join(' ')}>
					<h5 className="card-title">{this.state.name}</h5>
					
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
						<button name = {this.props.name} className = {["btn btn-danger"].join(' ')} name={this.state._id} onClick={this.viewClickHandler}>
									View
						</button>
				
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Campaign);