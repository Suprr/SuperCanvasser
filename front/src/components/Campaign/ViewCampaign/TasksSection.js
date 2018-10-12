import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import TaskCard from './TaskCard'

class TaskSection extends Component{
	state = {
		...this.props
	}

	render(){
		let count = 1;
		let tasks = this.state.tasks.map(task=>{

			return <TaskCard key={task.id} task={task} number={count++}/>;

		});
		return(
			<div className = {[classes.TasksSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Tasks</h4> 
					<button className = 'btn btn-danger col-1'>edit</button>
				</div>
				
				<div className = 'row justify-content-center'>
					<div className = {['text-center','row', classes.TasksBody].join(' ')}>
						{tasks}
					</div>
				</div>

			</div>
		);
	}

}

export default TaskSection;