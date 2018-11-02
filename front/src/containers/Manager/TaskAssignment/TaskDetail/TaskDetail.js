import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from '../../../../axios'
import TaskDetailHead from '../../../../components/Campaign/TaskAssignment/TaskDetail/TaskDetailHead'
import TaskDetailBody from '../../../../components/Campaign/TaskAssignment/TaskDetail/TaskDetailBody'
import Locations from '../../../../components/Campaign/TaskAssignment/TaskDetail/Locations'
import Modal from '../../../../components/UI/Modal/Modal'

class TaskDetail extends Component{
	state= {
		task: null,
		show:false,
	}

	componentDidMount(){
		if(!this.state.tasks){		
			axios.get('https://cse308-de3df.firebaseio.com/tasks/'+this.props.match.params.tid+'/.json').then(response=>{
				const newTasks = response.data;
				//console.log(task : )
				this.setState({task:newTasks})
			});
		}

	}

	openModalHandelr = () => {
	    this.setState({ show: true });
	 }

	modalCloseHandler = () => {
	    this.setState({ show: false });
	 }

	render(){
		const comp = (this.state.task?<div>
			<Modal show={this.state.show} modalClosed={this.modalCloseHandler}>
          		<Locations locations={this.state.task.locations}/>
        	</Modal>
        	
			<TaskDetailHead title={this.state.task.title}/>
			<TaskDetailBody task = {this.state.task} modalOpen = {this.openModalHandelr}/>
		</div>:null);
		return <div>{comp}</div>
	}
}


export default withRouter(TaskDetail);