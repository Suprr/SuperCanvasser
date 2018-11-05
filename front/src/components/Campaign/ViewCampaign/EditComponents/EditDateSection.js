import React, {Component} from 'react'
import classes from '../ViewCampaign.module.css'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
class EditDate extends Component{
	state={
		...this.props
	}

	render(){
		return(
			<div className = {[classes.DateSection, 'text-center'].join(' ')}>

				<div className = 'row justify-content-center'>
					<div className = {['text-center', classes.DateBody, 'col-12'].join(' ')}>
						<div className = {['row', classes.Date,'justify-content-center'].join(' ')}>
							<div className = {['col-3', classes.DateHead].join(' ')}>Start Date</div>
							 <DatePicker 
					              className = {[classes.DatePicker, 'col-9'].join(' ')}
					              selected={this.props.startDate}
					              onChange={this.props.onChangeStart}
					              name = {this.props.startName}
					          />  
								
						</div>
					</div>
				
					<div className = {['text-center', classes.DateBody, 'col-12'].join(' ')}>
						<div className = {['row', classes.Date,'justify-content-center'].join(' ')}>
							<div className = {['col-3', classes.DateHead].join(' ')}>End Date</div>
							 <DatePicker
					              className = {[classes.DatePicker, 'col-9'].join(' ')}
					              selected={this.props.endDate}
					              onChange={this.props.onChangeEnd}
					              name = {this.props.endName}
					          />  
						</div>
					</div>
				</div>

				<div className = 'row justify-content-center'>
					<div className = {['text-center', classes.QNRBody].join(' ')}>
						<button className = 'btn btn-danger ViewBtn' onClick={this.state.onClick}>Edit</button>
					</div>
				</div>
			</div>
				
		);
	}

}

export default EditDate;