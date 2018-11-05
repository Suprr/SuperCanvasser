import React, {Component} from 'react'
import classes from './TaskAssignment.module.css'
import {NavLink, withRouter} from 'react-router-dom'
class TaskAssignmentItem extends Component{
	viewClickHandler=(event)=>{
		const target = event.target;
		const task_id = target.name;
		console.log(['viewClickHandler'], task_id, 'props : ',this.props);

		sessionStorage.setItem('taskID', task_id);
		//change this url
		this.props.history.push('/manager/view/task');
	}

	render(){
		return <div className={['row', classes.Item].join(' ')}>
			<div className="col-2">Task {this.props.number}</div>
			<div className="col-3">{this.props.task.canvasserId}</div>
			<div className="col-3">{this.props.task.date}</div>
			<div className="col-2">{this.props.task.locations.length}</div>
			<div className="col-1"><button className={['btn', 'btn-light', classes.DetailBtn].join(' ')} name={this.props.task._id} onClick={this.viewClickHandler}>Detail</button></div>
		</div>;
	}
}

export default withRouter(TaskAssignmentItem);