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

import Geocode from 'react-geocode'

import NodeGeocoder from 'node-geocoder'
class CreateCampaign extends Component{
	state = {
		campaignTitle : '',
		managers : [],
		startDate : moment(),
		endDate : moment(),
		talkingPoint : '',
		questionnaire : [],
		locations : [],
		visitMin : '',
		newManager : '',
		newQuestionnaire :'',
		newLocation : '',
		id : null,
		manager_id : null,
		isMounted : false,
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
		  		
		  		
		  		const addressx = address.number+'+'+address.street.split(' ').join('+')+'%2C+'+address.unit.split(' ').join('+')+'%2c+'+address.city.split(' ').join('+')+'%2c+'+address.state+'+%2c+'+address.zipcode.split(' ').join('+');
		  		console.log(['Address'],addressx)

		  		//x is long, y is lat
		  		axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=`+addressx+`&benchmark=9&format=json`).
		  		then(res=>{
		  			const addressMatch = res.data.result.addressMatches[0];
		  			const long = addressMatch.coordinates.x;
		  			const lat =  addressMatch.coordinates.y;


		  			const newLocation = {
		  				latitude : lat,
			  			longitude : long,
		  				address : loc,
		  				id : this.state.locations.length,
		  			}
			  		

			  		console.log('Add Location', newLocation)

			  		this.setState((prevState)=>({
			  			locations : [...prevState.locations, newLocation],
			  			newLocation : ''
		  			}))

		  		}).catch(err=>{
		  			//invalid date pop up
		  			console.log(['addLocationHandler Err'],err)
		  		})

		  		
		  		
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
		  			questionnaire : [...prevState.questionnaire, newQuestion],
		  			newQuestionnaire : ''
		  		}));
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
	  		//console.log(['SUbmit'], this.state.startDate.)
	  		let realLocs=[]
	  		const locs = this.state.locations
	  		
	  		for(let i=0; i<locs.length; i++){
	  			let loc = {
	  				latitude : locs[i].latitude,
	  				longitude : locs[i].longitude,
	  				address : locs[i].address,
	  				qNa : {},
	  				visited : false,
	  				_id :"",
	  				anonymous : false,
	  				index : -1,
	  			}

	  			realLocs.push(loc);
	  		}

	  		let questionsArray = [];
	  		const questionnaire = this.state.questionnaire;

	  		for(let i=0; i<questionnaire.length; i++){
	  			questionsArray.push(questionnaire[i].question)
	  		}


	  		const campaign = {
		  		name : this.state.campaignTitle,
				managers : this.state.managers,
				startDate : this.state.startDate.format('YYYY-MM-DD'),
				endDate : this.state.endDate.format('YYYY-MM-DD'),
				talkingPoints : this.state.talkingPoint,
				questions : questionsArray,
				locations : realLocs,
				avgDuration : this.state.visitMin,
				status : "INACTIVE",
				tasks : [],
				canvassers : []
			}



	  		//If I use push it generates auto key
	  		//axios.push ('/campaigns.json', campaign).then( response => {
	  		console.log('[[Hi]',campaign);
	  		axios.post('/manager/campaign/create', campaign).then(response=>{
	  			console.log(['Create Campaign'], "Campaign is Created ", campaign);
	  		})

	  }

	  componentDidMount(){
	  	
	  	
	  	let x = null;

	  	const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
		const userID = userInfoData._id;

		console.log(['Create Campaign Did Mount'], userID);

		this.setState( { isMounted: true }, () => {
          	  
	          if(this.state.isMounted){
	            this.setState({manager_id:userID, managers : [userID]});
	          }

        });
	  }

	  componentWillUnMount(){
	    this.setState({isMounted:false});
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
					<VisitDuration visitMin = {this.state.visitMin} onChange = {(event) => this.handleInputChange(event)}/>
					
					<div className = {classes.Btn}>
						<button className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
					</div>
					
			
				
			</div>
		);
	}

}

export default CreateCampaign;