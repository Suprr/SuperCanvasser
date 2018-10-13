import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import Sidebar from '../../components/Navigation/Sidebar'
import CampaignList from './CampaignList/CampaignList'

import classes from './Manager.module.css'
import CampaignModel from './CampaignList/CampaignModel'
import ViewCampaign from './CampaignList/ViewCampaign/ViewCampaign'
import CreateCampaign from './CreateCampaign/CreateCampaign'
class Manager extends Component{
	
	state = {

		campaigns : CampaignModel.campaigns
		
	}

	render(){
		//<CampaignList campaigns = {this.state.campaigns}/>
		//<ViewCampaign campaign = {this.state.campaigns[0]}/>	
		//<CreateCampaign />
		// <Route path={this.props.match.url+'/campaign-list/:id'} 
  //                			 render={()=> <ViewCampaign campaign = {this.state.campaigns[0]}/>}/>
		console.log('[Manager]',this.props);
		return(	
				
				<div className={["col-10", "fixed-center", classes.Manager].join(' ')}>
					<Switch>
						<Route path={this.props.match.url+'/campaign-list'} exact render = {() =><CampaignList campaigns={this.state.campaigns}/>}/>
						<Route path={this.props.match.url+'/create-campaign'} component = {CreateCampaign}/>
						<Route path={this.props.match.url+'/campaign-list/:id/:index'} 
                         render={()=> <ViewCampaign campaign = {this.state.campaigns}/>}/>
						<Redirect from={this.props.match.url} to = {this.props.match.url+'/campaign-list'}/>
					</Switch>
				</div>
		)
	}

}

export default withRouter(Manager);