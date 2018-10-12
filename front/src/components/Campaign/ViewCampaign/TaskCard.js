import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class TaskCard extends Component{
	state ={
		...this.props
	}

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
								<button className = 'btn btn-danger'>Assign</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TaskCard;