import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class AddedLocations extends Component{
	

	render(){
		let locations = this.props.locations.map(loc => {
			let location = (
				<div className = 'row' key={loc.id}>
					<div className={[classes.QuestionnaireItem, 'col-10'].join(' ')}> 
						{loc.address} 
					</div>
					<div className = 'col-2'>
						<button className = 'btn btn-danger' name={loc.id} onClick={this.props.onClick}>Remove</button>
					</div>
				</div>
			)
			
			return location ;
		});

		return(
			<div className={[classes.HiddenSection, 'row', 'justify-content-center'].join(' ')}>
				<div className='col-6'>
				{locations}
				</div>
			</div>
		);
	}

}

export default AddedLocations;