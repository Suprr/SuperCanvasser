import React, {Component} from 'react'
import classes from '../ViewCampaign.module.css'

class EditDuration extends Component{
	state = {
		...this.props
	}

	render(){
		return(
			
					<div className = {['text-center'].join(' ')}>
						<input 	
							name = 'editedQuestion'
							value = {this.props.editedQuestion}
							className = {[classes.TextField].join(' ')}
							placeHolder = {this.props.editedQuestion}
							onChange={this.props.onChange}/>
					</div>
				

			
		);
	}

}

export default EditDuration;