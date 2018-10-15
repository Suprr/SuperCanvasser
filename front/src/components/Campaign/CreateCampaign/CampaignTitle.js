import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class CampaignTitle extends Component{
	

	render(){
		return(
			<div className={[classes.Section, 'row'].join(' ')}>
				<div className='col-3 text-center'> 
					<p>Campaign Name</p>
				</div>
				
				<div className = {['col-6', classes.InputSection].join(' ')}>
					<input 	
							name = 'campaignTitle'
							value = {this.props.campaignTitle}
							className = {[classes.TextField].join(' ')}
							onChange={this.props.onChange}/>
				</div>
			</div>
		);
	}

}

export default CampaignTitle;