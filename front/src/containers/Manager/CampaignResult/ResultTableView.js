import React, { Component } from "react";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import {withRouter, Route, Switch} from 'react-router-dom'
import axios from '../../../axios'
import TableViewTaskSection from '../../../components/Campaign/CampaignResult/TableViewTaskSection';
import classes from './Result.module.css'

class ResultTableView extends Component{
	state = {
		campaign:null,
		isMounted:false,
		tasks:null
	}
	
	componentDidMount(){
	    const cmpId = sessionStorage.getItem('campaignID');
	    this.setState( { isMounted: true }, () => {
	          axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
	           
	          const responseData = response.data[0];

		       //axios get Task List data by campaign ID
		       axios.post('task/tasks', responseData.tasks).then(res=>{
			        
			        let taskData= res.data 
			          //get tasks id from campaign
			        if(this.state.isMounted){
			            console.log('TaskAssignmentList', taskData);
			            this.setState({tasks:taskData, campaign:responseData});
			        }

		        }).catch(error=>{
		          console.log(error)
		        })

	    	});

   		});
	}

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 

    mapViewBtnClickHandler=()=>{
		this.props.history.push('/manager/result/mapView');
    }

    statViewBtnClickHandler=()=>{
    	this.props.history.push('/manager/result/statView');
    }

	render(){
		console.log(['TableView'], this.state.campaign);
		let count = 1;
		const taskSection = this.state.tasks?this.state.tasks.map(task=>{
			return <TableViewTaskSection key={task._id} task={task} number={count++}/>;
		}) : null;

		return(<div>
					<PageHead title="Campaign Result - Table View" subtitle={this.state.campaign?this.state.campaign.name:null}/>
					<div className={['row', classes.BtnSection, 'd-flex', 'justify-content-end'].join(' ')}>
						<button className='btn btn-danger' onClick={this.mapViewBtnClickHandler}>Map View</button>
						<button className='btn btn-danger' onClick={this.statViewBtnClickHandler}>Stat View</button>
					</div>
					{taskSection}
			   </div>
		);
	}
}

export default withRouter(ResultTableView);



