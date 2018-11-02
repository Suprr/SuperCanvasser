import React, {Component} from 'react'
import TaskAssignmentListHead from './TaskAssignmentListHead'
import TaskAssignmentItem from './TaskAssignmentItem'
import axios from '../../../axios'
class TaskAssignmentList extends Component{


	state = {
		tasks : null,
		load : this.props.load,
	}

	componentDidUpdate(){
		if(this.props.campaign){
			//console.log(['TaskAssignmentList'], this.state.load, this.state.tasks);
			
			if(!this.props.load){
				//get Tasks from server
				axios.get('https://cse308-de3df.firebaseio.com/tasks.json').then(response=>{
			          let taskData= response.data 
			          //get tasks id from campaign
			          let taskIndex = this.props.campaign.tasks;
			          
			          let newTasks = [];
			          
			          for(let i in taskIndex){
				           for(let t in taskData){
				           	  if(parseInt(taskData[t].id)==parseInt(taskIndex[i].id)){
				              		newTasks.push(taskData[t]);
				            	}
			          		}
			          
		           		}
			           this.setState((prevState)=>({tasks : newTasks}), this.props.updateHandler());
	     	 	});     
			}
		}
	}


	render(){

		let tasks =  this.state.tasks&&this.state.tasks.length>0? this.state.tasks.map(tsk =>{
			let task = <TaskAssignmentItem url={this.props.url} key= {tsk.id} task={tsk}/> 
		    return task;
		  }) : <h1>No Task</h1>;
		//console.log(this.state.tasks)
		const comp = this.props.campaign? (<div>
			<div>
				<TaskAssignmentListHead />
				{tasks}
			</div>

		</div>): null;
		return (
			<div>
				{comp}
			</div>
		) ;
	}
}

export default TaskAssignmentList;