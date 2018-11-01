import React, {Component} from 'react'
import classes from './TaskDetail.module.css'

class LocationItem extends Component{

	render(){
		return <div className={['row', classes.LocationItem].join(' ')}>
			<div className = 'col-1'>
			{this.props.number}
			</div>
			<div className='col-11'>
				{this.props.location}
			</div>
		</div>;
	}
}

export default LocationItem;