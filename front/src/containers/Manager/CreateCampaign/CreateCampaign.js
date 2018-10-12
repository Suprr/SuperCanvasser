
import React, {Component} from 'react'
import moment from 'moment'

import classes from './CreateCampaign.module.css'

import PageHead from '../../../components/Layout/PageHead/PageHead'
import CampaignTitle from '../../../components/Campaign/CreateCampaign/CampaignTitle'
import AddManager from '../../../components/Campaign/CreateCampaign/AddManager'
import AddedManagers from '../../../components/Campaign/CreateCampaign/AddedManagers'
import DateSection from '../../../components/Campaign/CreateCampaign/DateSection'
import TalkingPoint from '../../../components/Campaign/CreateCampaign/TalkingPoint'

import CreateQNR from '../../../components/Campaign/CreateCampaign/CreateQNR'
import AddedQuestionnaire from '../../../components/Campaign/CreateCampaign/AddedQuestionnaire'
import AddLocation from '../../../components/Campaign/CreateCampaign/AddLocation'
import AddedLocation from '../../../components/Campaign/CreateCampaign/AddedLocation'
import VisitDuration from '../../../components/Campaign/CreateCampaign/VisitDuration'

class CreateCampaign extends Component{
	state = {
		
		campaignTitle : '',
		managers : [{
			name : 'Manager1',
			id : 'm1'
		}],
		startDate : moment(),
		endDate : moment(),
		talkingPoint : '',
		questionnaire : [{
				question : 'Question1',
				id : 'q1'
			},
			{
				question : 'Question2',
				id : 'q2'
			}],
		locations : [],
		duration : '',
		
		newManager : '',
		newQuestionnaire :'',
		newLocation : ''

	}

	handleInputChange = (event)=> {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    
	    
   	 	this.setState({[name]: value });
		
	}

	 handleStartDateChange = (newDate)=>{
    	console.log('[HandleChange]',newDate)
	    this.setState({
	      startDate: newDate
	    });
	  }


	 handleEndDateChange = (newDate)=>{
    	console.log('[HandleChange]',newDate)
	    this.setState({
	      endDate: newDate
	    });
	  }


	render(){
		return(
			<div className='container'>
				<PageHead title='Create Campaign'/>
				<CampaignTitle  campaignTitle = {this.state.campaignTitle} 
					onChange = {(event) => this.handleInputChange(event)}/>
				<AddManager onChange = {(event) => this.handleInputChange(event)} 
					manager = {this.state.newManager}/>
				<AddedManagers managers = {this.state.managers}/>
				
				<DateSection name = 'startDate' date = {this.state.startDate} onChange = {this.handleStartDateChange}/>
				<DateSection name = 'endDate' date = {this.state.endDate} onChange = {this.handleEndDateChange}/>
				<TalkingPoint talkingPoint = {this.state.talkingPoint} onChange = {(event) => this.handleInputChange(event)}/>
				<CreateQNR questionnaire={this.state.newQuestionnaire} onChange={(event)=>this.handleInputChange(event)}/>
				<AddedQuestionnaire questionnaire = {this.state.questionnaire}/>
				<AddLocation location={this.state.newLocation} onChange={(event)=>this.handleInputChange(event)}/>
				<AddedLocation locations = {this.state.locations}/>
				<VisitDuration VisitDuration = {this.state.visitDuration} onChange = {(event) => this.handleInputChange(event)}/>
				<div className = {classes.Btn}>
					<button className="btn btn-dark">Submit</button>
				</div>
			</div>
		);
	}

}

export default CreateCampaign;