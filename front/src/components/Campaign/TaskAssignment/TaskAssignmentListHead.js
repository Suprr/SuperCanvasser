import React, {Component} from 'react'
import classes from './TaskAssignment.module.css'
class TaskAssignmentListHead extends Component{

	render(){
		return <div className={['row', classes.ListHead].join(' ')}>
			<div className='col-2'>Tasks</div>
			<div className='col-3'>Canvassers</div>
			<div className='col-3'>Dates</div>
			<div className='col-2'>Number of Locations</div>
		</div>
	}
}

export default TaskAssignmentListHead;