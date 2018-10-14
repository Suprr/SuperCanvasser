import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class ManagerSection extends Component{
	state = {
		...this.props
	}


	render(){
		let managers =  this.state.managers ? this.state.managers.map(mng=>{
			//<div className={[classes.Unknown, 'rounded-circle', 'text-center'].join(' ')}></div>
			let manager = (
					  <div key={mng.id} className={['row',classes.Manager].join(' ')}> 
						<div className={[classes.ManagerName, 'col-7', 'text-center'].join(' ')}>{mng.name}</div>
						<div className={[classes.Removebutton, 'col-5'].join(' ')}><button className = 'btn btn-danger col-4'>remove</button></div>
					  </div>);

			return manager;
		}) : null ;


		return(
			//<div className = {['container'].join(' ')}>
					
				<div className = {[classes.ManagerSection,'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-11', classes.Title].join(' ')}>Managers</h4> 
						<button className = 'btn btn-danger col-1'>Add</button>
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