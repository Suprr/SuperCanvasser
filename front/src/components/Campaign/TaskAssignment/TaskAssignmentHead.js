import React, {Component} from 'react'
//import Dropdown from 'react-dropdown'
import Dropdown from '../../UI/Dropdown/Dropdown'
import classes from './TaskAssignment.module.css'
//import './Dropdown.css'
class TaskAssignmentHead extends Component{
	state = {
		selectedCampaign : null,
		

	}

	dropDownHandler = (campaign) =>{
		console.log('[dropdownHandler]',campaign)
		this.props.selectedCampaign(campaign);
	}

	render(){
		
		const dropdown = this.props.campaigns? <Dropdown resetThenSet = {this.dropDownHandler} title = {'Choose A Campaigin'} list = {this.props.campaigns} />:null;
		
		return  (<div className={['row'].join(' ')}>
					<div className={['col-4'].join(' ')}>
						<h5 className={[classes.HeadTitle].join(' ')}>Select Campaign</h5>
					</div>
					<div className={['col-6'].join(' ')}>
						<div className={['row'].join(' ')}>
							{dropdown}
						</div>
					</div>
				</div>)
	}
}

export default TaskAssignmentHead;