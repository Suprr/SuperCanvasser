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
		isMounted:false,
	}

	componentDidMount(){
	


		const taskId = sessionStorage.getItem('taskID')
	    console.log(['View Campaign did mount'], taskId);

	    this.setState( { isMounted: true }, () => {
	    	  //change this url
	          axios.get('task/getById/?_id='+taskId).then(response=>{
	           
	          const responseData = response.data;
	          console.log(['View Task Data'],responseData);

	          if(this.state.isMounted){
	            console.log('View Task', 'UPLOADED');
	            this.setState({task:responseData});
	          }
	        }).catch(error=>{
	          console.log(error)
	        })
	    });

	}

	componentWillUnMount(){
		this.setState({isMounted:false});
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
        	
			<TaskDetailHead title='Task'/>
			<TaskDetailBody task = {this.state.task} modalOpen = {this.openModalHandelr}/>
		</div>:null);
		return <div>{comp}</div>
	}
}


export default withRouter(TaskDetail);