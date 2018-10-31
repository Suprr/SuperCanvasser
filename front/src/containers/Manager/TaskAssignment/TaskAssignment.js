import React,{Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'

import PageHead from '../../../components/Layout/PageHead/PageHead'
import TaskAssignmentHead from '../../../components/Campaign/TaskAssignment/TaskAssignmentHead'
import TaskAssignmentList from '../../../components/Campaign/TaskAssignment/TaskAssignmentList'
import classes from './TaskAssignment.module.css'
import axios from '../../../axios'
class TaskAssignment extends Component{
	state ={
		selectedCampaign: null,
		campaigns : null,
		tasks : null,
		loadTasks : false,
	}

	componentDidMount(){
		if(!this.state.campaigns&&this.props.campaignList){
      
	      axios.get('https://cse308-de3df.firebaseio.com/campaigns.json').then(response=>{
	          let x= response.data 
	          let campaignIndexes = this.props.campaignList;
	          let newCampaigns = [];
	          for(let c in campaignIndexes){
	            if(x){
	              newCampaigns.push(x[campaignIndexes[c]]);
	            }
	          }

	          this.setState((prevState)=>({campaigns : newCampaigns}));
	      });     
	    }
	}


  componentDidUpdate(){
    //console.log(['List componentDidUpdate'], this.props);
    if(!this.state.campaigns&&this.state.campaignList){
      axios.get('https://cse308-de3df.firebaseio.com/campaigns.json').then(response=>{
          let x= response.data 
          let campaignIndexes = this.state.campaignList;
          let newCampaigns = [];
          for(let c in campaignIndexes){
            if(x){
              newCampaigns.push(x[campaignIndexes[c]]);
            }
          }

          this.setState((prevState)=>({campaigns : newCampaigns}));
      });     
    }
    
  }

  componentWillReceiveProps(nextProps){

    //console.log(['componentWillReceiveProps List'], nextProps.campaignList);

    if(!this.state.campaignList){
      this.setState({campaignList : nextProps.campaignList});
    }
  }

  //when user select a campaign, this method is called from Task Assignment Header
  selectedCampaignHandler = (campaign) =>{
  	this.setState({selectedCampaign : campaign, loadTasks : false});
  }

  //when Tasks are loaded this method is called from Task AssignmentList
  tasksUpdate = () =>{
  	this.setState({loadTasks:true})
  }

	render(){
		//console.log(['Task Assignment'],this.state.campaigns)
		return <div>
					<PageHead title='View Task Assignment'/>
					<div className={classes.TaskAssignmentHead}>
						<TaskAssignmentHead campaigns = {this.state.campaigns} selectedCampaign={this.selectedCampaignHandler}/>
					</div>
					<div className={classes.ListComponent}>
						<TaskAssignmentList campaign = {this.state.selectedCampaign} tasks = {this.state.tasks} updateHandler = {this.tasksUpdate} load = {this.state.loadTasks}/>
					</div>
				</div>
	}
}

export default withRouter(TaskAssignment)