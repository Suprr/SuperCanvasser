import React, {Component} from 'react';

import Sidebar from '../../components/Navigation/Sidebar'
import CampaignList from './CampaignList/CampaignList'

import classes from './Manager.module.css'
import CampaignModel from './CampaignList/CampaignModel'
import ViewCampaign from './CampaignList/ViewCampaign/ViewCampaign'

class Manager extends Component{
	
	state = {

		campaigns : CampaignModel.campaigns
		
	}

	render(){
		//<CampaignList campaigns = {this.state.campaigns}/>
		//
		console.log('[Manager]',this.state.campaigns)
		return(	
				
			
				<div className={["col-10", "fixed-center", classes.Manager].join(' ')}>
					<ViewCampaign campaign = {this.state.campaigns[0]}/>
					
				</div>
			
		)
	}

}

export default Manager;