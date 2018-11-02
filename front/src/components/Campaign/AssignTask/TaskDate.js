import React, {Component} from 'react'
import classes from './Availability.module.css'

class TaskDate extends Component{
	state = {...this.props}
	render(){
		return (
			<div className = {['row', classes.Section].join(' ')}>
				<div className = {['col-3'].join(' ')}>
					<h4> Task Date</h4>
				</div>
				<div className = {['col-6', classes.TaskDate].join(' ')}>
					<h4>{this.props.date}</h4>
				</div>
			</div>
		);
	}
}

export default TaskDate