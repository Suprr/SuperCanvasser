import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class VisitDuration extends Component{
	

	render(){
		return(
			<div className={[classes.Section, 'row'].join(' ')}>
				<div className='col-3 text-center'> 
					<p>Visit Duration</p>
				</div>
				
				<div className = {['col-6', classes.InputSection].join(' ')}>
					<input 	
							name = 'visitDuration'
							value = {this.props.visitDuration}
							className = {[classes.TextField].join(' ')}
							onChange={this.props.onChange}/>
				</div>
			</div>
		);
	}

}

export default VisitDuration;