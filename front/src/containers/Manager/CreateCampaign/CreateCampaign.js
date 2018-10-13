
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

import axios from '../../../axios'
class CreateCampaign extends Component{
	state = {
		
		campaignTitle : '',
		managers : [],
		startDate : moment(),
		endDate : moment(),
		talkingPoint : '',
		questionnaire : [],
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

	  addManagerHandler = (event) =>{
	  		let newManager = {
	  			name : this.state.newManager, 
	  			id : 'm'+this.state.newManager
	  		}
	  		this.setState((prevState)=>({
	  			managers : [...prevState.managers, newManager]
	  		}))

	  		this.setState({
	  			newManager : ''
	  		});
	  }

	  addLocationHandler = (event) =>{
	  		let newLocation = {
	  			location : this.state.newLocation, 
	  			id : 'l'+this.state.newLocation
	  		}
	  		this.setState((prevState)=>({
	  			locations : [...prevState.locations, newLocation]
	  		}))

	  		this.setState({
	  			newLocation : ''
	  		});
	  }

	  addQuestionnaireHandler = (event) =>{
	  		let newQuestion = {
	  			question : this.state.newQuestionnaire, 
	  			id : 'q'+this.state.newQuestionnaire
	  		}
	  		this.setState((prevState)=>({
	  			questionnaire : [...prevState.questionnaire, newQuestion]
	  		}))

	  		this.setState({
	  			newQuestionnaire : ''
	  		});
	  }


	  handleSubmit = (event) =>{
	  		const campaign = {campaign:{...this.state}}
	  		axios.post('/campaigns.json', campaign).then( response => {

           		console.log("campaignCreated", campaign, "response : ", response);
           		this.props.signedin();
            } )
            .catch( error => {
                console.log("Error", error);
            });
	  }

	render(){
		return(
			<div className='container'>
					
					<PageHead title='Create Campaign'/>
					<CampaignTitle  campaignTitle = {this.state.campaignTitle} 
						onChange = {(event) => this.handleInputChange(event)}/>
					<AddManager onChange = {(event) => this.handleInputChange(event)} onClick = {(event)=>this.addManagerHandler(event)}  
						manager = {this.state.newManager}/>
					<AddedManagers managers = {this.state.managers}/>
					
					<DateSection name = 'startDate' date = {this.state.startDate} onChange = {this.handleStartDateChange}/>
					<DateSection name = 'endDate' date = {this.state.endDate} onChange = {this.handleEndDateChange}/>
					<TalkingPoint talkingPoint = {this.state.talkingPoint} onChange = {(event) => this.handleInputChange(event)}/>
					<CreateQNR questionnaire={this.state.newQuestionnaire} onChange={(event)=>this.handleInputChange(event)}
						onClick = {(event)=>this.addQuestionnaireHandler(event)}/>
					<AddedQuestionnaire questionnaire = {this.state.questionnaire} />
					<AddLocation location={this.state.newLocation} onChange={(event)=>this.handleInputChange(event)}
							onClick = {(event)=>this.addLocationHandler(event)}/>
					<AddedLocation locations = {this.state.locations}/>
					<VisitDuration VisitDuration = {this.state.visitDuration} onChange = {(event) => this.handleInputChange(event)}/>
				
				<form onSubmit = {this.handleSubmit}>
					<div className = {classes.Btn}>
						<button className="btn btn-dark">Submit</button>
					</div>
				</form>
				
			</div>
		);
	}

}

export default CreateCampaign;