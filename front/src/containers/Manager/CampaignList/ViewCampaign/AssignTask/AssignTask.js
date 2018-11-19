import React, {Component} from 'react';
import PageHead from '../../../../../components/Layout/PageHead/PageHead'
import TaskDate from '../../../../../components/Campaign/AssignTask/TaskDate'
import Canvasser from '../../../../../components/Campaign/AssignTask/Canvasser'
import Availability from '../../../../../components/Campaign/AssignTask/Availability'
import SearchCanvasser from '../../../../../components/Campaign/AssignTask/SearchCanvasser'
import classes from './AssignTask.module.css'
import Modal from '../../../../../components/UI/Modal/Modal'
import {withRouter} from 'react-router-dom'

class AssignTask extends Component{

	state = {
		task_id : this.props.match.params.id,
		show : false,
		selectedCanvasser : null,
	}

	openModalHandelr = () => {
	    this.setState({ show: true });
	}

	modalCloseHandler = () => {
		this.setState({ show: false });
	}

	setSelectCanvasser = (canv) =>{
		this.setState({selectedCanvasser : canv});
		console.log(['Selected Availability '], canv);
	}

	render(){
		console.log(['Assign Task'], this.state.selectedCanvasser);

		return (
			<div>
				<Modal show={this.state.show} modalClosed={this.modalCloseHandler}>
		        	<SearchCanvasser show ={this.state.show} setSelectCanvasser={this.setSelectCanvasser} modalClosed = {this.modalCloseHandler}/>
		        </Modal>
		       
				<PageHead title="Assign Task"/>
				 <div className = {classes.AssignTaskBody}>
					<TaskDate date = "Aug 3 2018"/>
					<Canvasser modalOpen = {this.openModalHandelr} canvasser = {this.state.selectedCanvasser}/>
					<Availability canvasser = {this.state.selectedCanvasser}/>
				</div>
			</div>
		);


	}
}


export default withRouter(AssignTask);