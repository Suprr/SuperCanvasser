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
		console.log(['viewClickHandler'], campaign_id, 'props : ',this.props);

		sessionStorage.setItem('campaignID', campaign_id);
		this.props.history.push('/manager/campaign/view');
	}

	render(){
						//<Link className={classes.Link} to={this.props.url+'/view'}>
		return(

			<div className = {["card", classes.Campaign].join(' ')}>
				<div className={["card-body"].join(' ')}>
					<h5 className="card-title">{this.props.campaign.name}</h5>
					
					<div className={["container-fluid", classes.CampaignBody].join(' ')}>
						<div className="row">
							<div className="col-5">
								<p>Start</p>
								<p>End</p>
							</div>
							<div className="col-7">
								<p>{this.props.campaign.startDate}</p>
								<p>{this.props.campaign.endDate}</p>
							</div>
						</div>
					</div>

					<div>
						<button className = {["btn btn-danger"].join(' ')} name={this.props.campaign._id} onClick={this.viewClickHandler}>
									View
						</button>
				
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Campaign);