import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import AssignTask from '../../../containers/Manager/CampaignList/ViewCampaign/AssignTask/AssignTask'
import {Link} from 'react-router-dom'
class TaskCard extends Component{
	state ={
		...this.props
	}

	 handler = () =>{
	 	let url = this.state.url.split('/');
		let headURL =  '/'+url[1]+'/'+url[2];
	 	console.log(headURL+'/assign-task/'+this.state.id);
	 	this.props.history.push(headURL+'/assign-task/'+this.state.campaign_id+'/'+this.state.id+'/');
	}

	// if task is already assigned the assign button will disappear.

	render(){
		
		
		
		return(
			<div className = {["card", classes.TaskCard].join(' ')}>
				<div className={["card-body"].join(' ')}>
					<h5 className="card-title">Task {this.state.number}</h5>
					
					<div className={["container-fluid", classes.TaskCardBody].join(' ')}>
						<div className="row">
							<div className="col-5">
								<button className = 'btn btn-light'>View</button>
							</div>
							<div className="col-7">
									<button className = 'btn btn-danger' onClick={this.handler}>Assign</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TaskCard;