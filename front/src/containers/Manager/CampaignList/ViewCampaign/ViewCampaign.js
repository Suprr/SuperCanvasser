import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import ManagerSection from '../../../../components/Campaign/ViewCampaign/ManagerSection'
import DateSection from '../../../../components/Campaign/ViewCampaign/DateSection'
import TalkingPointSection from '../../../../components/Campaign/ViewCampaign/TalkingPointSection'
import QuestionnaireSection from '../../../../components/Campaign/ViewCampaign/QuestionnaireSection'
import VisitDurationSection from '../../../../components/Campaign/ViewCampaign/VisitDurationSection'
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
				<div className = {[classes.TitleSection].join(' ')}>
					<h4> ViewCampaign</h4>
					<h5 className = {[classes.CampaignTitle].join(' ')}>{this.state.title}</h5>
				</div>
				
				<div className={[classes.Components, 'container'].join(' ')}>
					<div className='row justify-content-center'><ManagerSection managers = {this.state.managers}/></div>
					<div className='row justify-content-center'><DateSection startDate = {this.state.startDate} endDate = {this.state.endDate}/></div>
					<div className='row justify-content-center'><TalkingPointSection talkingPoint = {this.state.talkingPoint}/></div>
					<div className='row justify-content-center'><QuestionnaireSection showModal = {this.state.show} clickedHandler={this.openModalHandelr}/></div>
					<div className='row justify-content-center'><VisitDurationSection duration = {this.state.visitDuration}/></div>
				
				</div>
			</div> 
		);
	}
}


export default ViewCampaign;