import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import EditDateSection from './EditComponents/EditDateSection'
import moment from 'moment';

class DateSection extends Component{
	state={
		...this.props,
		showEdit : false,
		editedStartDate : '',
		editedEndDate : '', 
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
		if(this.state.editedStartDate!=''&&this.state.editedEndDate!=''){
		
			this.setState((prevState)=>({
				startDate : this.state.editedStartDate._d.toDateString(),
				endDate : this.state.editedEndDate._d.toDateString(),
				showEdit:false}));
		} else{
			this.setState((prevState)=>({
				showEdit:false
			}));
		}

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