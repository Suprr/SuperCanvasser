import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import classes from '../Campaign.module.css'
import Inactive from '../../../assets/images/inactivity.png'
import Active from '../../../assets/images/inprogress.png'
import Finish from '../../../assets/images/finish.png'
class CampaignResultCard extends Component{
	state ={
		...this.props.campaign
	}
	viewClickHandler=(event)=>{
		const target = event.target;
		const campaign_id = target.name;
		console.log(['viewClickHandler'], campaign_id, 'props : ',this.props);

		sessionStorage.setItem('campaignID', campaign_id);
		this.props.history.push('/manager/result/tableView');
	}

	render(){
						//<Link className={classes.Link} to={this.props.url+'/view'}>
		let img = null;
		if(this.props.campaign){
			const status = this.props.campaign.status;
			if(status=='INACTIVE')
				img = <img src={Inactive}/>
			else if(status=='ACTIVE')
				img = <img src={Active}/>
			else
				img = <img src={Finish}/>
		}

		return(
			<div className = {["card", classes.Campaign].join(' ')}>
				<div className={["card-body"].join(' ')}>
					<div className={['row', 'card-title', 'd-flex','justify-content-center', classes.CardHead].join(' ')}>
						<h5>{this.props.campaign.name}</h5>
						<div className={classes.progressImage}>{img}</div>
					</div>
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
									Result
						</button>
				
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(CampaignResultCard);