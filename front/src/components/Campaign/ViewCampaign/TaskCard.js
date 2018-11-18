import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import AssignTask from '../../../containers/Manager/CampaignList/ViewCampaign/AssignTask/AssignTask'
import {Link, withRouter} from 'react-router-dom'
class TaskCard extends Component{
	state ={
		...this.props
	}

	viewClickHandler=(event)=>{
		const target = event.target;
		const task_id = target.name;
		console.log(['viewClickHandler'], task_id, 'props : ',this.props);

		sessionStorage.setItem('taskID', task_id);
		//change this url
		this.props.history.push('/manager/view/task');
	}
	// if task is already assigned the assign button will disappear.

	render(){
		
		
		return(
			<div className = {["card", classes.TaskCard].join(' ')}>
				<div className={["card-body"].join(' ')}>
					<h5 className="card-title">Task {this.state.number}</h5>
					
					<div className={["container-fluid", classes.TaskCardBody].join(' ')}>
						<div className="row d-flex justify-content-center">
								<button className = 'btn btn-light' name={this.props.task} onClick={this.viewClickHandler}>View</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(TaskCard);