import React, {Component} from 'react'
import classes from './TaskAssignment.module.css'
import {NavLink} from 'react-router-dom'
class TaskAssignmentItem extends Component{

	render(){
		return <div className={['row', classes.Item].join(' ')}>
			<div className="col-2">{this.props.task.title}</div>
			<div className="col-3">{this.props.task.canvasser}</div>
			<div className="col-3">{this.props.task.date}</div>
			<div className="col-2">{this.props.task.locations.length}</div>
			<div className="col-1">{this.props.task.duration}</div>
			<div className="col-1"><NavLink to={this.props.url+'/'+this.props.task.id} ><button className={['btn', 'btn-light', classes.DetailBtn].join(' ')} >Detail</button></NavLink></div>
		</div>;
	}
}

export default TaskAssignmentItem;