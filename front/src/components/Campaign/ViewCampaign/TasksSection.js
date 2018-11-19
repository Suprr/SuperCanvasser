import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import TaskCard from './TaskCard'

class TaskSection extends Component{
	state = {
		...this.props
	}

	render(){
		console.log('[TaskSection]',this.state.tasks)
		let count = 1;
		let tasks = this.state.tasks ? this.state.tasks.map(task=>{

			return <TaskCard key={count}
					campaign_id = {this.props.id} history = {this.props.history} task={task} number={count++} url = {this.state.url}/>;

		}) : null;
		return(
			<div className = {[classes.TasksSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Tasks</h4> 
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