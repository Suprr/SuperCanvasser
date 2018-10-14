import React, {Component} from 'react'
import classes from '../ViewCampaign.module.css'

class EditTalkingPointComponent extends Component{
	state = {
		...this.props
	}


	render(){
		return(
				<div>
					<div className = 'row justify-content-center'>
						<textarea 	
								name = 'editedTalkingPoint'
								value = {this.props.edittedTalkingPoint}
								className = {[classes.TPTextField].join(' ')}
								onChange={this.props.onChange}/>
					</div>

					<div className = 'row justify-content-center'>
						<div className = {['text-center', classes.QNRBody].join(' ')}>
							<button className = 'btn btn-danger ViewBtn' onClick={this.state.onClick}>Edit</button>
						</div>
					</div>
				</div>
		);
	}

}

export default EditTalkingPointComponent;