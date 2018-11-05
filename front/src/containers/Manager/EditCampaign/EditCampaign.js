import React, {Component} from 'react'
import moment from 'moment'

import classes from '../CreateCampaign/CreateCampaign.module.css'

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

class EditCampaign extends Component{
	
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
		_id : null
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
			  			qNa : {},
			  			id : this.state.locations.length,
			  			_id:"",
			  			index : -1,
			  			anonymous:false,
			  			visited : false
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
	  		let realLocs=[];
	  		const locs = this.state.locations;
	  		let realQuestions = [];
	  		const questions = this.state.questionnaire;
	  		
	  		for(let i=0; i<locs.length; i++){
	  			//if(locs[i]._id!)
	  			let loc = {
	  				latitude : locs[i].latitude,
	  				longitude : locs[i].latitude,
	  				address : locs[i].address,
	  				qNa : locs[i].qNa,
	  				visited:locs[i].visited,
	  				_id : locs[i]._id,
	  				index : locs[i].index,
	  				anonymous : locs[i].anonymous
	  			}

	  			realLocs.push(loc);
	  		}

	  		for(let i=0; i<questions.length; i++){
	  			realQuestions.push(questions[i].question);
	  		}

	  		const campaign = {
		  		name : this.state.campaignTitle,
				managers : this.state.managers,
				startDate : this.state.startDate.format('YYYY-MM-DD'),
				endDate : this.state.endDate.format('YYYY-MM-DD'),
				talkingPoints : this.state.talkingPoint,
				questions : realQuestions,
				locations : realLocs,
				avgDuration : this.state.visitMin,
				status : "INACTIVE",
				tasks : this.state.tasks,
				canvassers : [],
				questionnaire : [],
				_id : this.state._id
			}

	  		//If I use push it generates auto key
	  		//axios.push ('/campaigns.json', campaign).then( response => {
	  		console.log('[[EDITED]',campaign);
	  		axios.post('/manager/campaign/edit', campaign).then(response=>{
	  			console.log(['Edit Campaign'], campaign);
	  		})

	  }

	  componentDidMount(){
	  	let x = null;

	  	const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
		const userID = userInfoData._id;
		const cmpId = sessionStorage.getItem('campaignID')

		this.setState( { isMounted: true }, () => {

			  axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
           
		          const newCampaign = response.data[0];
		        	
		         

		          let newQuestionnaire = [];
		          for(let i=0; i<newCampaign.questions.length; i++){
		          	const qnr ={question: newCampaign.questions[i], id:i}
		          	newQuestionnaire.push(qnr);
		          }

		          let locationArray = [];
		          for(let i=0; i<newCampaign.locations.length; i++){
		          	const loc = {
		          		latitude : newCampaign.locations[i].latitude,
		          		longitude : newCampaign.locations[i].longitude,
		          		address : newCampaign.locations[i].address,
		  				qNa : newCampaign.locations[i].qNa,
		  				visited:newCampaign.locations[i].visited,
		  				_id : newCampaign.locations[i]._id,
		  				index : newCampaign.locations[i].index,
		  				anonymous : newCampaign.locations[i].anonymous,
		  				id : newCampaign.locations[i]._id
		          	}

		          	locationArray.push(loc);
		          }





		          if(this.state.isMounted){
		            console.log('ViewCampaign', 'UPLOADED', newCampaign);
		            this.setState({campaignTitle:newCampaign.name,
		                           managers:newCampaign.managers,
		                           startDate : moment(newCampaign.startDate),
		                           endDate : moment(newCampaign.endDate),
		                           talkingPoint : newCampaign.talkingPoints,
		                    	   questionnaire : newQuestionnaire,
		                    	   locations : locationArray,
		                    	   tasks : newCampaign.tasks,
		                    	   visitMin : newCampaign.avgDuration,
		                       	   manager_id:userID,
		                       	   _id : newCampaign._id});
		          }
		        }).catch(error=>{
		          console.log(error)
		        })
        });
	  }

	  componentWillUnMount(){
	    this.setState({isMounted:false});
	  }

	render(){
		console.log(['Edit Campaign Render']);
		return(
			<div className='container'>
					
					<PageHead title='Edit Campaign'/>
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

export default EditCampaign;