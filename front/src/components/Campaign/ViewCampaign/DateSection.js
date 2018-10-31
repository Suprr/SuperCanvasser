import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import EditDateSection from './EditComponents/EditDateSection'
import moment from 'moment';
import axios from '../../../axios'
import dateFns from 'date-fns'

class DateSection extends Component{
	state={
		...this.props,
		showEdit : false,
		editedStartDate : moment(this.props.startDate),
		editedEndDate : moment(this.props.endDate), 
		//It must be moment variable 
	}

	showEditComponentHandler(){

		this.setState((prevState)=>({
			showEdit: true
		}));
	}

	startDatapickerHandler=(newDate)=>{
   	 	this.setState({editedStartDate: newDate});
	}
	endDatapickerHandler=(newDate)=>{
   	 	this.setState({editedEndDate: newDate});
	}

	editTimeHandler = (event) =>{
		console.log(this.state.editedStartDate.format('MM DD YYYY'));
		if(this.state.editedStartDate!=''&&this.state.editedEndDate!=''){
		
			this.setState((prevState)=>({
				startDate : this.state.editedStartDate.format('MM DD YYYY'),
				endDate : this.state.editedEndDate.format('MM DD YYYY'),
				showEdit:false}));
		} else{
			this.setState((prevState)=>({
				showEdit:false
			}));
		}

		
		axios.put('/campaigns/'+this.props.id+'/startDate.json/', JSON.stringify(this.state.editedStartDate.format('MM DD YYYY'))).then( response => {  
	              console.log("Success", this.state.startDate);
	      })
	      .catch( error => {
	          console.log("Error", error);
	    });


		axios.put('/campaigns/'+this.props.id+'/endDate.json/', JSON.stringify(this.state.editedEndDate.format('MM DD YYYY'))).then( response => {  
	              console.log("Success", this.state.endDate);
	      })
	      .catch( error => {
	          console.log("Error", error);
	    });

	}

	render(){
		let dateSectionComponent = 	null
		if(this.state.showEdit){
			dateSectionComponent = <EditDateSection startName = 'editedStartDate' startDate = {this.state.editedStartDate}
					endName = 'editedEndDate' endDate = {this.state.editedEndDate}
				  onChangeStart = {this.startDatapickerHandler} onChangeEnd ={this.endDatapickerHandler} onClick={this.editTimeHandler} /> 
		}else{
			dateSectionComponent = (
				<div className = 'row justify-content-center'>
					<div className = {['text-center', classes.DateBody].join(' ')}>
						<div className = {['row', classes.Date].join(' ')}>
							<div className = {['col-6', classes.DateHead].join(' ')}>Start Date</div>
							<div className = {['col-6', classes.DateTime].join(' ')}>{this.state.startDate}</div>
						</div>

						<div className = {['row', classes.Date].join(' ')}>
							<div className = {['col-6', classes.DateHead].join(' ')}>End Date</div>
							<div className = {['col-6', classes.DateTime].join(' ')}>{this.state.endDate}</div>
						</div>
					</div>
				</div>
			);
		}

		let showEditButton = this.state.showEdit? null : <button className = 'btn btn-danger col-1' onClick={(event)=>this.showEditComponentHandler(event)}>edit</button>;
		return(
			
			<div className = {[classes.DateSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Dates</h4> 
					{showEditButton}
				</div>
				{dateSectionComponent}

			</div>
				
		);
	}

}

export default DateSection;