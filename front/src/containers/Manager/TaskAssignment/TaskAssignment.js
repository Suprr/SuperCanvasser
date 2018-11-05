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
		campaigns : this.props.campaignList,
		tasks : null,
		loadTasks : false,
	}


  //when user select a campaign, this method is called from Task Assignment Header
  selectedCampaignHandler = (campaign) =>{
  	console.log(['TaskAssignment'],campaign);
  	this.setState({selectedCampaign : campaign, loadTasks : false});
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