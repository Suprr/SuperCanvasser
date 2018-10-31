import React, {Component} from 'react'

class TaskAssignmentItem extends Component{

	render(){
		return <div><h1>{this.props.task.title}</h1> </div>;
	}
}

export default TaskAssignmentItem;