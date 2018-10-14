import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import Sidebar from '../../components/Navigation/Sidebar'
import CampaignList from './CampaignList/CampaignList'

import classes from './Manager.module.css'
import CampaignModel from './CampaignList/CampaignModel'
import ViewCampaign from './CampaignList/ViewCampaign/ViewCampaign'
import CreateCampaign from './CreateCampaign/CreateCampaign'

import axios from '../../axios'
class Manager extends Component{
	
	state = {

		campaignList : null,
		managerID : 0,
		campaigns : null
		
	}

	componentDidMount(){
		console.log('[Manager componentWillMount]', this.state.campaignList);
		let x = null
		if(!this.state.campaignList){
			 axios.get('https://cse308-de3df.firebaseio.com/managers/'+this.state.managerID+'.json').then(response=>{
		          x= response.data 
		          console.log('[Manager componentWillMount]',x.campaigns)
		          this.setState({campaignList : response.data.campaigns})
		      });    
			 console.log('HEREEEE',x);
		}	
	}

	realCampianSet=(realCamp)=>{
		console.log('[Real Camp]',realCamp)
		this.setState({campaigns : realCamp});
	}

	render(){
		//<CampaignList campaigns = {this.state.campaigns}/>
		//<ViewCampaign campaign = {this.state.campaigns[0]}/>	
		//<CreateCampaign />
		// <Route path={this.props.match.url+'/campaign-list/:id'} 
  //                			 render={()=> <ViewCampaign campaign = {this.state.campaigns[0]}/>}/>
		console.log('[Manager]',this.state.campaigns);
		return(	
				
				<div className={["col-10", "fixed-center", classes.Manager].join(' ')}>
					<Switch>
						<Route path={this.props.match.url+'/campaign-list'} exact render = {() =><CampaignList campaignSet = {this.realCampianSet} campaignList={this.state.campaignList}/>}/>
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