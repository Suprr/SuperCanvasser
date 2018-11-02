import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import Sidebar from '../../components/Navigation/Sidebar'
import CampaignList from './CampaignList/CampaignList'

import classes from './Manager.module.css'
import CampaignModel from './CampaignList/CampaignModel'
import ViewCampaign from './CampaignList/ViewCampaign/ViewCampaign'
import CreateCampaign from './CreateCampaign/CreateCampaign'
import AssignTask from './CampaignList/ViewCampaign/AssignTask/AssignTask'
import TaskAssignment from './TaskAssignment/TaskAssignment'
import TaskDetail from './TaskAssignment/TaskDetail/TaskDetail'
import axios from '../../axios'
class Manager extends Component{
	
	state = {

		campaignList : null,
		managerID : 0,
		campaigns : null
		
	}

	componentDidMount(){
		//console.log(['Manager componentDidMount'], this.state.campaignList);
		let x = null
		
		if(!this.state.campaignList){
			 axios.get('https://cse308-de3df.firebaseio.com/managers/'+this.state.managerID+'.json').then(response=>{
		          x= response.data 
		        //  console.log('[Manager componentDidMount]',x.campaigns)
		          this.setState((prevState)=>({campaignList : response.data.campaigns}));
		      });    
		}	
	}
	

	componentDidUpdate(){
		//console.log(['Manager componentDidUpdate'], this.state.campaignList);
	}


	realCampianSet=(realCamp)=>{
		//console.log('[Real Camp]',realCamp)
		this.setState({campaigns : realCamp});
	}

	render(){
		console.log(['Manager Props'], this.props.match.params);
		//console.log(['Manager render'],this.state.campaigns, '[campaignList]', this.state.campaignList);
		return(	
				
				<div className={["col-10", "fixed-center", classes.Manager].join(' ')}>
					<Switch>
						<Route path={this.props.match.url+'/campaign-list'} exact render = {() =><CampaignList campaignSet = {this.realCampianSet} campaignList={this.state.campaignList}/>}/>
						<Route path={this.props.match.url+'/create-campaign'} component = {CreateCampaign}/>
						<Route path={this.props.match.url+'/assign-task/:cid/:tid'} 
							render = {() => <AssignTask/>}/>
						<Route path={this.props.match.url+'/campaign-list/:id/:index'} 
                         render={()=> <ViewCampaign campaign = {this.state.campaigns}/>}/>
                         <Route path={this.props.match.url+'/task-assignment/:tid'} render = {()=><TaskDetail/>}/>
                         <Route path={this.props.match.url+'/task-assignment/'} render = {()=><TaskAssignment campaignList={this.state.campaignList}/>}/>

						<Redirect from={this.props.match.url} to = {this.props.match.url+'/campaign-list'}/>
					</Switch>
				</div>
		)
	}

}

export default withRouter(Manager);