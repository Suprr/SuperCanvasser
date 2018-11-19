import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

import RemoveIcon from '../../../assets/images/minus.png'

class AddedLocations extends Component{
	
	state = {
		showProgressCircle : false
	}
	render(){
		//console.log(['AddedLocations'], this.props.locations)
		let locations = this.props.locations.map(loc => {
			//console.log(loc)
			let location = (
				<div className = 'row' key={loc.id}>
					<div className={[classes.QuestionnaireItem, 'col-10'].join(' ')}> 
						{loc.address} 
					</div>
					<div className = 'col-2'>
						<input type='image' src={RemoveIcon} className={classes.RemoveBtn} name={loc.id} onClick={this.props.onClick}/>
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