import React,{Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'

import PageHead from '../../../components/Layout/PageHead/PageHead'
import TaskAssignmentHead from '../../../components/Campaign/TaskAssignment/TaskAssignmentHead'
import TaskAssignmentList from '../../../components/Campaign/TaskAssignment/TaskAssignmentList'
import classes from './TaskAssignment.module.css'
import axios from '../../../axios'
import TaskDetail from './TaskDetail/TaskDetail'
class TaskAssignment extends Component{
	state ={
		selectedCampaign: null,
		campaigns : null,
		tasks : null,
		loadTasks : false,
		isMounted : false
	}


	componentDidMount(){
		//console.log(['Manager componentDidMount'], this.state.campaignList);
		 let x = null
		 //userID is id from session store
		 const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
		//const data = sessionStorage.getItem('userInfo');
		 const userID = userInfoData._id;
		 //const userID = getSessionStore.
		 this.setState( { isMounted: true }, () => {

	         axios.get('/manager/campaign/list/?_id='+userID).then(response=>{
		          
		          const data = response.data;
		          
		          const length = data.length;
		          let newCampaigns = []
		          for(let i=0; i<length; i++){
		            newCampaigns.push(data[i]);
		          }
		          if(this.state.isMounted){
		            this.setState({campaigns:newCampaigns});
		          }
	        }).catch(error=>{
	          console.log('USER ID Error', userID);
	          console.log(error)
	        })
    	} );
      
  	}

	  componentWillUnMount(){
	    this.setState({isMounted:false});
	  }	
  //when user select a campaign, this method is called from Task Assignment Header
  selectedCampaignHandler = (campaign) =>{
  	this.setState({selectedCampaign : campaign, loadTasks : false, tasks:campaign.tasks});
  }

  //when Tasks are loaded this method is called from Task AssignmentList
  tasksUpdate = () =>{
  	this.setState({loadTasks:true})
  }

	render(){
		console.log(['Task Assignment'], this.props)
		return <div>
					<PageHead title='View Task Assignment'/>
					<div className={classes.TaskAssignmentHead}>
						<TaskAssignmentHead campaigns = {this.state.campaigns} selectedCampaign={this.selectedCampaignHandler}/>
					</div>
					<div className={classes.ListComponent}>
						<TaskAssignmentList url = {this.props.match.url}campaign = {this.state.selectedCampaign} tasks = {this.state.tasks} updateHandler = {this.tasksUpdate} load = {this.state.loadTasks}/>
					</div>
					
				</div>
	}
}

export default withRouter(TaskAssignment)