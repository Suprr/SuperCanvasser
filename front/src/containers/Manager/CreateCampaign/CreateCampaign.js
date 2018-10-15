
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
import Modal from '../../../components/UI/Modal/Modal'
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
		newLocation : '',
		id : null
	}

	handleInputChange = (event)=> {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    
   	 	this.setState({[name]: value });
		
	}

	 handleStartDateChange = (newDate)=>{
	   
	    this.setState({
	      startDate: newDate
	    });
	  }


	 handleEndDateChange = (newDate)=>{
	    this.setState({
	      endDate: newDate
	    });
	  }

	  addManagerHandler = (event) =>{
	  		if(this.state.newManager==''){
	  			//show modal
	  		}else{
		  		let newManager = {
		  			name : this.state.newManager, 
		  			id : this.state.managers.length
		  		}
		  		this.setState((prevState)=>({
		  			managers : [...prevState.managers, newManager]
		  		}))

		  		this.setState({
		  			newManager : ''
		  		});
	  		}
	  }

	  addLocationHandler = (address, event) =>{
	  		let loc ='';
	  		if(address.number=='' || address.street=='' || address.city=='' || address.state=='' || address.zipcode==''){
	  				//show modal
	  		} else{
		  		loc = address.number +", "+ address.street + ", "+ address.unit +", "+ address.city +", "+ address.state + ", "+ address.zipcode
		  			
		  		let newLocation = {
		  			location : loc,
		  			id : this.state.locations.length
		  		}

		  		this.setState((prevState)=>({
		  			locations : [...prevState.locations, newLocation]
		  		}))

		  		this.setState({
		  			newLocation : ''
		  		});
	  		}
	  }

	  addQuestionnaireHandler = (event) =>{
	  		if(this.state.newQuestion==''){
	  			//show modal
	  		}else{
		  		let newQuestion = {
		  			question : this.state.newQuestionnaire, 
		  			id : this.state.questionnaire.length
		  		}

		  		this.setState((prevState)=>({
		  			questionnaire : [...prevState.questionnaire, newQuestion]
		  		}));

		  		this.setState({
		  			newQuestionnaire : ''
		  		});
	  		}
	  }

	  removeQuestionnaireHandler = (event) =>{
  			const removedList = this.state.questionnaire.filter(ele=>{return ele.id != event.target.name});
		  	this.setState((prevState)=>({
		  		questionnaire : removedList		
		  	}));
	  }

	  removeLocationHandler = (event) =>{

  			const removedList = this.state.locations.filter(ele=>{return ele.id != event.target.name});
		  	this.setState((prevState)=>({
		  		locations : removedList		
		  	}));
	  }


	  handleSubmit = (event) =>{
	  		const campaign = {
		  		campaignTitle : this.state.campaignTitle,
				managers : this.state.managers,
				startDate : this.state.startDate._d.toDateString(),
				endDate : this.state.endDate._d.toDateString(),
				talkingPoint : this.state.talkingPoint,
				questionnaire : this.state.questionnaire,
				locations : this.state.locations,
				duration : this.state.duration,
				id : this.state.id 
			}

	  		//If I use push it generates auto key
	  		//axios.push ('/campaigns.json', campaign).then( response => {
	  		console.log('[[Hi]',this.state.id);
	  		axios.put('/campaigns/'+this.state.id+'.json/', campaign).then( response => {

           		console.log("campaignCreated", campaign, "response : ", response);
           		this.props.signedin();
            })
            .catch( error => {
                console.log("Error", error);
            });

            axios.put('/managers/0/campaigns/'+this.state.id+'.json/',JSON.stringify(this.state.id)).then( response => {

           		console.log("addCampaignToManager");
           		
            })
            .catch( error => {
                console.log("Error", error);
            });


            // axios.put('/campaigns/length', this.state.id+1).then( response => {

           	// 	console.log("id is increased");
           		
            // })
            // .catch( error => {
            //     console.log("Error", error);
            // });


	  }

	  componentDidMount(){;
	  	console.log(['Create Campaign Did Mount']);
	  	
	  	let x = null
	  	axios.get('https://cse308-de3df.firebaseio.com/campaigns.json').then(response=>{
	  		x= response.data
	  		

	  		if(x!=null){
	  			console.log(x.length)
	  			let lastID = x[x.length-1].id
	  			this.setState({id : lastID+1})
	  		}else{
	  			this.setState({id : 0})
	  		}
	  	});	  	
	  	// 	console.log('Fail');
	  	// })
	  }

	render(){
		console.log(['Create Campaign Render']);
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
					<AddedQuestionnaire questionnaire = {this.state.questionnaire} onClick={this.removeQuestionnaireHandler}/>
					<AddLocation location={this.state.newLocation} onChange={this.handleInputChange}
							onClick = {(event)=>this.addLocationHandler(event)}/>
					<AddedLocation locations = {this.state.locations}  onClick = {this.removeLocationHandler}/>
					<VisitDuration VisitDuration = {this.state.visitDuration} onChange = {(event) => this.handleInputChange(event)}/>
				
					<div className = {classes.Btn}>
						<button className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
					</div>
			
				
			</div>
		);
	}

}

export default CreateCampaign;