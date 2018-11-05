import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class ManagerSection extends Component{
	state = {
		...this.props
	}

	//should create a method for getting managers info from user.

	render(){
		console.log(['ManagerSection'],this.props.managers)
		let managers =  this.state.managers ? this.state.managers.map(mng=>{
			//<div className={[classes.Unknown, 'rounded-circle', 'text-center'].join(' ')}></div>
			let manager = (
					  <div key={mng._id} className={['row',classes.Manager].join(' ')}> 
						<div className={[classes.ManagerName, 'col-7', 'text-center'].join(' ')}>{mng.firstName+" "+mng.lastName}</div>
					 </div>);

			return manager;
		}) : null ;

		return(
			//<div className = {['container'].join(' ')}>
					
				<div className = {[classes.ManagerSection,'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-11', classes.Title].join(' ')}>Managers</h4> 
					</div>

					<div className = {['col-12', classes.ManagerBody].join(' ')}>
						{managers}
					</div>
				</div>

			//</div>
		);
	}

}

export default ManagerSection;