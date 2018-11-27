import React, {Component} from 'react'
import classes from './CampaignResult.module.css'
import './resultLocation.css'

class ResultLocationItem extends Component{

	render(){
		return <div className={['row', classes.LocationItem].join(' ')}>
			<div className = 'col-1'>
			{this.props.number}
			</div>

			<div className='col-9'>
				{this.props.location}
			</div>
			<div className={['col-2'].join(' ')}>
				<div className={[this.props.color, classes.Circle].join(' ')}>
				</div>
			</div>
		</div>;
	}
}

export default ResultLocationItem;