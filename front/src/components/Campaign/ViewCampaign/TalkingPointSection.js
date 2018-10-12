import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class TalkingPointSection extends Component{
	state = {
		...this.props
	}
	render(){
		return(
			<div className = {[classes.TPSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Talking Point</h4> 
					<button className = 'btn btn-danger col-1'>edit</button>
				</div>
				
				<div className = 'row justify-content-center'>
					<div className = {['text-center', classes.TPBody].join(' ')}>
						{this.state.talkingPoint}
					</div>
				</div>

			</div>
		);
	}

}

export default TalkingPointSection;