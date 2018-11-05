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
		questions: [],
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
		  		
		  		let lat = null;
		  		let long = null;

		  		const newLocation = {
		  			location : loc,
		  			id : this.state.locations.length
		  		}

		  		const addressx = address.number+'+'+address.street.split(' ').join('+')+'%2C+'+address.unit.split(' ').join('+')+'%2c+'+address.city.split(' ').join('+')+'%2c+'+address.state+'+%2c+'+address.zipcode.split(' ').join('+');
		  		console.log(['ADdress'],addressx)

		  		//x is long, y is lat
		  		axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=`+addressx+`&benchmark=9&format=json`).
		  		then(res=>{
		  			const addressMatch = res.data.result.addressMatches[0];
		  			long = addressMatch.coordinates.x;
		  			lat =  addressMatch.coordinates.y;


			  		const realLocation = {
			  			lat : lat,
			  			long : long,
			  			address : loc,
			  			questionnaire : {}
			  		}

			  		console.log('Add Location', realLocation)

			  		this.setState((prevState)=>({
			  			locations : [...prevState.locations, newLocation],
			  			realLocs : [...prevState.realLocs, realLocation],
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
		  			questions : [...prevState.questions, this.state.newQuestionnaire],
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
	  			let loc = {
	  				lat : locs[i].lat,
	  				long : locs[i].long,
	  				address : locs[i].address,
	  				questionnaire : {},
	  				visited:false,
	  				_id : ""
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
				locations : this.state.realLocs,
				avgDuration : this.state.visitMin,
				status : "INACTIVE",
				tasks : [],
				canvassers : [],
				questionnaire : [],
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
           
		          const responseData = response.data
		          const dataLength = responseData.length;
		          const newCampaign = responseData[0];

		          let managerArray = [];
		          
		          for(let i=1; i<dataLength; i++){
		            managerArray.push(responseData[i]);
		          }
		          let newQuestionnaire = [];
		          for(let i=0; i<newCampaign.questions.length; i++){
		          	const qnr ={question: newCampaign.questions[i], id:i}
		          	newQuestionnaire.push(qnr);
		          }

		          if(this.state.isMounted){
		            console.log('ViewCampaign', 'UPLOADED', newCampaign);
		            this.setState({campaignTitle:newCampaign.name,
		                           managers:managerArray,
		                           startDate : moment(newCampaign.startDate),
		                           endDate : moment(newCampaign.endDate),
		                           talkingPoint : newCampaign.talkingPoints,
		                    	   questionnaire : newQuestionnaire,
		                    	   locations : newCampaign.locations,
		                    	   visitMin : newCampaign.avgDuration,
		                           questions : newCampaign.questions,
		                       	   manager_id:userID});
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