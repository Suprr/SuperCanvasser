import React, {Component} from 'react'
import TaskAssignmentListHead from './TaskAssignmentListHead'
import TaskAssignmentItem from './TaskAssignmentItem'
import axios from '../../../axios'
class TaskAssignmentList extends Component{


	state = {
		tasks : null,
		load : this.props.load,
		isMounted:false,
	}

	componentDidUpdate(){
			//console.log(['TaskAssignmentList'], this.state.load, this.state.tasks);
				//get Tasks from server
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

	componentDidUpdate(){

		if(this.props.campaign){
			if(!this.props.load){
				const taskId = sessionStorage.getItem('taskID')
			    console.log(['TaskAssignmentList did mount'], taskId);

			    this.setState( { isMounted: true }, () => {
			    	  //change this url
			          axios.post('task/tasks', this.props.tasks).then(response=>{
				        let taskData= response.data 
				          //get tasks id from campaign
				          
				        if(this.state.isMounted){
				            console.log('TaskAssignmentList', taskData);
				            this.setState({tasks:taskData});
				        }
		     	 	  
			        }, this.props.updateHandler()).catch(error=>{
			          console.log(error)
			        })
			    });
			}

		}	

	}

	componentWillUnMount(){
		this.setState({isMounted:false});
	}


	render(){
		let count = 1;
		let tasks =  this.state.tasks&&this.state.tasks.length>0? this.state.tasks.map(tsk =>{
			let task = <TaskAssignmentItem url={this.props.url} key= {tsk._id} task={tsk} number = {count}/> 
			count++;
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