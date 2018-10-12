import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class TalkingPoint extends Component{
	

	render(){
		return(
			<div className={[classes.Section, 'row'].join(' ')}>
				<div className='col-3 text-center'> 
					<p>TalkingPoint</p>
				</div>
				
				<div className = {['col-7', classes.InputSection].join(' ')}>
					<textarea 	
							name = 'talkingPoint'
							value = {this.props.talkingPoint}
							className = {[classes.TPTextField].join(' ')}
							onChange={this.props.onChange}/>
				</div>
			</div>
		);
	}

}

export default TalkingPoint;