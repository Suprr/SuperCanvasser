import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class DateSection extends Component{
	state={
		...this.props
	}
	render(){
		return(
			
			<div className = {[classes.DateSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Dates</h4> 
					<button className = 'btn btn-danger col-1'>edit</button>
				</div>
				
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

			</div>
				
		);
	}

}

export default DateSection;