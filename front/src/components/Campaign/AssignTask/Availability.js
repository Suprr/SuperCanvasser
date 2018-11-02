import React, {Component} from 'react'
import Calendar from '../../UI/Calendar/Calendar'
import classes from './Availability.module.css'

import dateFns from "date-fns";
import axios from '../../../axios'
class Availability extends Component{
	state = {...this.props}
	
	//when canvasser is assigned this task
	//1. if this task is already assigned, search a canvasse who is assigned on this task
	//2. remove the task from the canvasser who is already assigned on it.
	//3. add this taks to canvasser's task list and change the inavailability date of canvasser.
	//4, change tasks's canvasser to new canvasser 

	assignHandler=(day)=>{
		if(this.props.canvasser){
			const Day = day.toString();
			const date = Day.split(' ');
			const storedDate = date.slice(0,4);
			const storedDateString = storedDate.join(' ');
			const canvasserID = this.props.canvasser.id;

			//put the available date on canvasser's inavailable

			// axios.put('/canvasser/'+canvasserID+'/inavailable/'+nextInavailable+'/',storedDateString).then( response => {  
		 	//              console.log(['Success for Availability'], storedDateString);
		 	//      })
		 	//      .catch( error => {
		 	//          console.log("Error", error);
		 	// });
	 	 }
	}


	render(){
		let inavailable = this.props.canvasser? this.props.canvasser.inavailable :null 
		console.log(['Availability'], inavailable);
		
		return (
			<div className={classes.Section}>
			<div className = {['row'].join(' ')}>
				<div className = {['col-3'].join(' ')}>
					<h4> Canvasser</h4>
					<h4> Availability</h4>
				</div>
			</div>

			<div className = {['row'].join(' ')}>
				<Calendar inavailable = {inavailable} onClick = {this.assignHandler} />
			</div>
			</div>
		);

	}
}

export default Availability