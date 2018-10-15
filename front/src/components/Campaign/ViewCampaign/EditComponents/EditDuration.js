import React, {Component} from 'react'
import classes from '../ViewCampaign.module.css'

class EditDuration extends Component{
	state = {
		...this.props
	}

	render(){
		return(
			
					<div className = {['text-center', classes.VDBody].join(' ')}>
						<input 	
							name = 'editedHour'
							value = {this.props.editedHour}
							className = {[classes.TextField].join(' ')}
							placeHolder = 'Hour'
							onChange={this.props.onChange}/>

							<input 	
							name = 'editedMin'
							value = {this.props.editedMin}
							className = {[classes.TextField].join(' ')}
							placeHolder = 'Min'
							onChange={this.props.onChange}/>

							<div className = 'row justify-content-center'>
								<div className = {['text-center', classes.QNRBody].join(' ')}>
									<button className = 'btn btn-danger ViewBtn' onClick={this.state.onClick}>Edit</button>
								</div>

							</div>
					</div>
				

			
		);
	}

}

export default EditDuration;