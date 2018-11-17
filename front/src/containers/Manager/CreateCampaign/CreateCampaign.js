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

import ManagerList from '../../../components/Campaign/CreateCampaign/ManagerList'
import axios from '../../../axios'
import Modal from '../../../components/UI/Modal/Modal'

import Geocode from 'react-geocode'

import NodeGeocoder from 'node-geocoder'
import MessageBox from '../../../components/UI/MessageBox/MessageBox'
import {withRouter} from 'react-router-dom'

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
		show : false,
		message : null,
		managerList : false
	}

	handleInputChange = (event)=> {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    if(target.validity.valid){
   	 		this.setState({[name]: value });
   	 	} else{
   	 		if(target.name=='visitMin')
   	 			this.showMessageBox('Visit duration must be integer.');
   	 		else
   	 			this.showMessageBox('Invalid Type');
   	 	}
		
	}

	 handleStartDateChange = (newDate)=>{
	   
	    this.setState({
	      startDate: newDate
	    });
	  }


	 handleEndDateChange = (newDate)=>{
	 	if((!this.state.startDate.isSame(newDate,'day'))&&this.state.startDate.isAfter(newDate)){
	 		this.showMessageBox('The End Date Must Be After the Start Date');
	 	} else{
	 		//valid date
	 		this.setState({
		      endDate: newDate
		    });
	 	}

	    
	  }

	  selectManager = (manager) =>{
	  	this.setState({newManager : manager});
	  }

	  addManagerHandler = (event) =>{
	  		if(this.state.newManager==''){
	  			//show modal
	  		}else{
		  		let newManager = this.state.newManager;
		  		
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
	  		if(address.address1=='' || address.city=='' || address.state=='' || address.zipcode==''){
	  				this.showMessageBox('Fill the location info please.');
	  		} else{
	  			if(address.address2!='')
		  			loc = address.address1+ ", "+ address.address2 +", "+ address.city +", "+ address.state + ", "+ address.zipcode
		  		else
	  				loc = address.address1+ ", "+ address.city +", "+ address.state + ", "+ address.zipcode
		  		
		  		const addressx = address.address1.split(' ').join('+')+'%2C+'+address.address2.split(' ').join('+')+'%2c+'+address.city.split(' ').join('+')+'%2c+'+address.state+'+%2c+'+address.zipcode.split(' ').join('+');
		  		//x is long, y is lat
		  		axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=`+addressx+`&benchmark=9&format=json`).
			  		then(res=>{
			  			const addressMatch = res.data.result.addressMatches[0];
			  			const long = addressMatch.coordinates.x;
			  			const lat =  addressMatch.coordinates.y;

			  			let validLocation = true;
			  			
			  			for(let i=0; i<this.state.locations.length; i++){
				  			let loc = this.state.locations[i]
				  			if(loc.latitude===lat && loc.longitude===long){
				  				validLocation = false;
				  				break;
				  			}
				  		}

				  		if(validLocation){
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

			  			} else{
			  				this.showMessageBox('The location is already added');
			  			}

			  		}).catch(err=>{
			  			//invalid date pop up
			  			console.log(['addLocationHandler Err'],err)
			  			this.showMessageBox('Invalid Location, Try again');
			  		})
	  		}
	  }


	  showMessageBox = (message) => {
	    this.setState({ show: true , message : message});
	  }

	  closeMessageBox = () => {
	    this.setState({ show: false });
	  }

	  openSearchModal = () =>{
	  	this.setState({managerList : true})
	  }

	  closeSearchModal = () =>{
	  	this.setState({managerList:false})
	  }


	  addQuestionnaireHandler = (event) =>{
	  		if(this.state.newQuestionnaire==''){
	  			//show modal
	  			this.showMessageBox('Type new question to add it in your questionnaire list.');
	  		}else{
	  			let validQuestion = true;
	  			for(let i =0; i<this.state.questionnaire.length; i++){
	  				let q = this.state.questionnaire[i];
	  				if(q.question == this.state.newQuestionnaire){
	  					validQuestion = false;
	  				}
	  			}

	  			if(validQuestion){
			  		let newQuestion = {
			  			question : this.state.newQuestionnaire, 
			  			id : this.state.questionnaire.length
			  		}

			  		this.setState((prevState)=>({
			  			questionnaire : [...prevState.questionnaire, newQuestion],
			  			newQuestionnaire : ''
			  		}));
		  		} else{
		  			this.showMessageBox('This question is already added.');
		  		}
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

	  		if(this.state.campaignTitle==''||this.state.visitMin==''||this.state.talkingPoint==''){
	  			this.showMessageBox('There is one more empty text field');
	  		} else if(!parseInt(this.state.visitMin)){
	  			this.showMessageBox('Visit duration cannot be string value.');
	  		} else if((!this.state.startDate.isSame(this.state.endDate,'day'))&&this.state.startDate.isAfter(this.state.endDate)){
				this.showMessageBox('Start Date Must Be Prior to the End Date.');
	  		} else if(questionsArray.length==0||realLocs.length==0){
	  			this.showMessageBox('Questionnaire and Locations must be one more.');
	  		}  else{
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
		  		axios.post('/manager/campaign/create', campaign).then(response=>{
		  			console.log(['Create Campaign'], "Campaign is Created ", campaign);
		  			this.props.history.push('/manager/campaign/list');
		  		})
	  		}
	  }

	  componentDidMount(){
	  	
	  	let x = null;

	  	const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
		const userID = userInfoData._id;

		console.log(['Create Campaign Did Mount'], userID);

		this.setState( { isMounted: true }, () => {
          	  
	          if(this.state.isMounted){
	            this.setState(prevState=>({
	            	manager_id:userID, 
	            	managers : [...prevState.managers, userID]
	            }));
	          }

        });
	  }

	  componentWillUnMount(){
	    this.setState({isMounted:false});
	  }

	render(){
		return(
			<div className='container'>
					<Modal show={this.state.managerList} modalClosed={this.closeSearchModal}>
			          <ManagerList selectManager={this.selectManager}/>
			        </Modal>

					<MessageBox show={this.state.show} modalClosed={this.closeMessageBox} message={this.state.message}/>
					<PageHead title='Create Campaign'/>
					<CampaignTitle  campaignTitle = {this.state.campaignTitle} 
						onChange = {(event) => this.handleInputChange(event)}/>
					<AddManager onChange = {(event) => this.handleInputChange(event)} onClick = {(event)=>this.addManagerHandler(event)} openSearchModal={this.openSearchModal} 
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

export default withRouter(CreateCampaign);