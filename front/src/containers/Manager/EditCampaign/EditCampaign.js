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
import AddLocation from '../../../components/Campaign/CreateCampaign/AddLocation2'
import AddedLocation from '../../../components/Campaign/CreateCampaign/AddedLocation'
import VisitDuration from '../../../components/Campaign/CreateCampaign/VisitDuration'

import axios from '../../../axios'
import Modal from '../../../components/UI/Modal/Modal'
import ManagerList from '../../../components/Campaign/CreateCampaign/ManagerList'

import Geocode from 'react-geocode'

import NodeGeocoder from 'node-geocoder'

import MessageBox from '../../../components/UI/MessageBox/MessageBox'
import {withRouter} from 'react-router-dom'

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
		newLocations : '',
		id : null,
		manager_id : null,
		isMounted : false,
		_id : null,
		show : false,
		message : null,
		managerList : false,
		searchedManagerList : [],
	}

	handleInputChange = (event)=> {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    
	    if(target.validity.valid){
   	 		if(target.name=='newManager'){
   	 			this.setState({newManager : value, 
   	 				newManagerObj : null})
   	 		} else{
   	 			this.setState({[name]: value });
   	 		}
   	 	} else{
   	 		if(target.name=='visitMin')
   	 			this.showMessageBox('Visit duration must be integer.');
   	 		else
   	 			this.showMessageBox('Invalid Type');
   	 		
   	 	}
		
	}

	 handleStartDateChange = (newDate)=>{
	   
	   if((!newDate.isSame(moment(),'day'))&&moment().isAfter(newDate)){
	 		this.showMessageBox('The Start Date Must Be After Today');
	 	} else{
	 		//valid date
	 		this.setState({
		      startDate: newDate
		    });
	 	}
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
	  	console.log(['Selected Manager'], manager);
	  	this.setState({newManager : manager.firstName+ " " + manager.lastName,
	  					newManagerObj : manager,
	  					managerList : false});
	  }

	  addManagerHandler = (event) =>{
	  		if(!this.state.newManagerObj){
	  			//show modal
	  			this.showMessageBox('Manager is not selected from the search list. You must not modify the selected manager from the input textfield.');

	  		}else{
		  		let newManager = this.state.newManagerObj._id;
		  		let valid = true;
		  		for(let i=0; i<this.state.managers.length; i++){
		  			console.log(['AddManager Handler'], newManager, this.state.managers[i]);
		  			if(newManager==this.state.managers[i]){
		  				valid=false;
		  				break;
		  			}
		  		}

		  		if(valid){
			  		this.setState((prevState)=>({
			  			managers : [...prevState.managers, newManager],
			  			newManager : '',
			  			newManagerObj : null
			  		}))
		  		} else {
		  			this.showMessageBox('The manager is already on the list.');
		  			this.setState((prevState)=>({
			  			newManager : '',
			  			newManagerObj : null
			  		}));
		  		}
	  		}
	  }

	  
	  getAxios=(url)=>{
	  	return axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=`+url+`&benchmark=9&format=json`);
	  }

	  addLocationHandler = (address, event) =>{
	  		console.log(this.state.locations)
	  		let loc ='';

	  		const locations =address.newLocations;
	  		console.log(' add location handler ', locations);
	  		
	  		if(locations==''){
	  			this.showMessageBox('Fill the location info please.');
	  		} else{
	  			const locationArray = locations.split('\n');
	  			if(locationArray.length==100){
	  				this.showMessageBox('Number of locations must be smaller than 100');
	  			} else{

	  				let axiosArray=[];
	  				for(let i=0; i<locationArray.length; i++){
	  					let location = locationArray[i].split(',');
	  					let url = location[0]+'+';

	  					for(let j=1; j<location.length-1; j++){
	  						let l = location[j].split(' ').join('+')+'%2C+';
	  						url+=l.substring(1);
	  					}

	  					url=url + location[location.length-1].substring(1);

	  					axiosArray.push(this.getAxios(url));					  		
	  				}

	  				Promise.all(axiosArray).then(result => {
	  						let locs = [];

					        for (let i = 0; i < result.length; i++) {
					            // myObject[args[i].config.params.saveLocation] = args[i].data;
					            console.log(result[i]);
					            const res = result[i];
			            		const addressMatch = res.data.result.addressMatches[0];
					  			const long = addressMatch.coordinates.x;
					  			const lat =  addressMatch.coordinates.y;
					  			const addr = addressMatch.matchedAddress;

					  			let validLocation = true;
					  			
					  			for(let i=0; i<this.state.locations.length; i++){
						  			let loc = this.state.locations[i]
						  			if(loc.latitude===lat && loc.longitude===long){
						  				validLocation = false;
						  				break;
						  			}
						  		}

						  		for(let i=0; i<locs.length; i++){
						  			let loc = locs[i]
						  			if(loc.latitude===lat && loc.longitude===long){
						  				validLocation = false;
						  				break;
						  			}
						  		}

						  		if(validLocation){
						  			const newLocation = {
							  			latitude : lat,
							  			longitude : long,
							  			address : addr,
							  			qNa : {},
							  			id : addr,
							  			_id:"",
							  			index : -1,
							  			anonymous:false,
							  			visited : false
							  		}
								  		
							  		locs.push(newLocation);
						  		}

						  		if(i==result.length-1){
						  			//console.log('Add Location', locs)
						  			let newlocs = [];
						  			for(let i=0; i<this.state.locations.length; i++){
						  				newlocs.push(this.state.locations[i])
						  			}
						  			for(let j=0; j<locs.length; j++){
						  				newlocs.push(locs[j])
						  			}

						  			this.showMessageBox(locs.length+' locations are added. If there are redundancy locations, it will not be added.');
						  			this.setState((prevState)=>({
						  			locations : newlocs,
							  			newLocations : ''
						  			}))
					        	}
					    }}).catch(err=>{
					    	this.showMessageBox('There are invalid format of location please check it, then input again.\n'+
					    		'Input ex) 40, Piedmont Drive, Apartment 16B, Brookhaven, NY, 11776');
					    });
	  			}
	  		}
	  }

	  showMessageBox = (message) => {
	    this.setState({ show: true , message : message});
	  }

	  closeMessageBox = () => {
	    this.setState({ show: false });
	  }

	  openSearchModal = () =>{
           axios.get('/manager/campaign/create/manlist?regex='+this.state.newManager).then(response=>{
	          	  const managerList = response.data;
	          	  console.log(['ManagerList'], managerList)
		          this.setState({searchedManagerList: managerList, managerList : true});
	        }).catch(error=>{
	          console.log(error)
	        });	
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

	  removeManagerHandler = (event) =>{
	  		console.log(['Remove Handler'], event.target.name);
	  		if(this.state.managers.length<=1){
	  			this.showMessageBox('Number of manager must be at least one');
	  		} else{
	  			const removedList = this.state.managers.filter(ele=>{return ele != event.target.name});
			  	this.setState((prevState)=>({
			  		managers : removedList		
			  	}));
		  	}
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
	  				longitude : locs[i].longitude,
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

	  		if(this.state.campaignTitle==''||this.state.visitMin==''||this.state.talkingPoint==''){
	  			this.showMessageBox('There is one more empty text field');
	  		} else if(!parseInt(this.state.visitMin)){
	  			this.showMessageBox('Visit duration cannot be string value.');
	  		} else if((!this.state.startDate.isSame(this.state.endDate,'day'))&&this.state.startDate.isAfter(this.state.endDate)){
				this.showMessageBox('Start Date Must Be Prior to the End Date.');
	  		} else if(realQuestions.length==0||realLocs.length==0){
	  			this.showMessageBox('Questionnaire and Locations must be one more.');
	  		}  else{

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
		  			this.props.history.push('/manager/campaign/view');
		  		})
		  	}

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
					<MessageBox show={this.state.show} modalClosed={this.closeMessageBox} message={this.state.message}/>
					<Modal show={this.state.managerList} modalClosed={this.closeSearchModal}>
			          <ManagerList selectManager={this.selectManager} searchedManagers = {this.state.searchedManagerList}/>
			        </Modal>
					<PageHead title='Edit Campaign'/>
					<CampaignTitle  campaignTitle = {this.state.campaignTitle} 
						onChange = {(event) => this.handleInputChange(event)}/>

					<AddManager onChange = {(event) => this.handleInputChange(event)} onClick = {(event)=>this.addManagerHandler(event)} openSearchModal={this.openSearchModal} 
						manager = {this.state.newManager}/>
					<AddedManagers managers = {this.state.managers} removeHandler = {this.removeManagerHandler}/>
					
					<DateSection name = 'startDate' date = {this.state.startDate} onChange = {this.handleStartDateChange}/>
					<DateSection name = 'endDate' date = {this.state.endDate} onChange = {this.handleEndDateChange}/>
					<TalkingPoint talkingPoint = {this.state.talkingPoint} onChange = {(event) => this.handleInputChange(event)}/>
					<CreateQNR questionnaire={this.state.newQuestionnaire} onChange={(event)=>this.handleInputChange(event)}
						onClick = {(event)=>this.addQuestionnaireHandler(event)}/>
					<AddedQuestionnaire questionnaire = {this.state.questionnaire} onClick={this.removeQuestionnaireHandler}/>
					<AddLocation location={this.state.newLocations} onChange={this.handleInputChange}
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

export default withRouter(EditCampaign);