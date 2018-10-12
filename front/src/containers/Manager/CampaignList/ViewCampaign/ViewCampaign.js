import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

import PageHead from '../../../../components/Layout/PageHead/PageHead'

import ManagerSection from '../../../../components/Campaign/ViewCampaign/ManagerSection'
import DateSection from '../../../../components/Campaign/ViewCampaign/DateSection'
import TalkingPointSection from '../../../../components/Campaign/ViewCampaign/TalkingPointSection'
import QuestionnaireSection from '../../../../components/Campaign/ViewCampaign/QuestionnaireSection'
import VisitDurationSection from '../../../../components/Campaign/ViewCampaign/VisitDurationSection'
import TasksSection from '../../../../components/Campaign/ViewCampaign/TasksSection'

import QuestionnaireList from '../../../../components/Campaign/ViewCampaign/QuestionnaireList'

import Modal from '../../../../components/UI/Modal/Modal'


class ViewCampaign extends Component{

	state = {
		...this.props.campaign,
		show : false
	}

	openModalHandelr = ()=>{
		this.setState({show : true});
	}

	modalCloseHandler = () =>{
		this.setState({show: false});
	}


	render(){
		return (
			<div className = {[classes.ViewCampaign].join(' ')}>
				<Modal show={this.state.show} modalClosed={this.modalCloseHandler}><QuestionnaireList questionnaire = {this.state.questionnaire}/></Modal>
				<PageHead title='View Campaign' subtitle={this.state.title}/>
				
				<div className={[classes.Components, 'container'].join(' ')}>
					<div className='row justify-content-center'><ManagerSection managers = {this.state.managers}/></div>
					<div className='row justify-content-center'><DateSection startDate = {this.state.startDate} endDate = {this.state.endDate}/></div>
					<div className='row justify-content-center'><TalkingPointSection talkingPoint = {this.state.talkingPoint}/></div>
					<div className='row justify-content-center'><QuestionnaireSection showModal = {this.state.show} clickedHandler={this.openModalHandelr}/></div>
					<div className='row justify-content-center'><VisitDurationSection duration = {this.state.visitDuration}/></div>
					<div className='row justify-content-center'><TasksSection tasks = {this.state.task}/></div>
									
				</div>
			</div> 
		);
	}
}


export default ViewCampaign;