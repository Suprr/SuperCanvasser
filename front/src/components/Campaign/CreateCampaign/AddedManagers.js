import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class AddedManagers extends Component{
	

	render(){
		let managers = this.props.managers.map(manager => {
			let mng = <div key={manager.id}> {manager.name} </div>
			return mng ;
		});

		return(
			<div className={[classes.HiddenSection, 'row', 'justify-content-center'].join(' ')}>
				<div className='col-6'>
				{managers}
				</div>
			</div>
		);
	}

}

export default AddedManagers;