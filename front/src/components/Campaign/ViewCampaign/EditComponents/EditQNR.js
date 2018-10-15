import React, {Component} from 'react'
import classes from '../ViewCampaign.module.css'

class EditDuration extends Component{
	state = {
		...this.props
	}

	render(){
		let addBtn = this.props.type? <button className='btn btn-danger' onClick={this.props.onClick}>+</button> : null; 
		return(
			
					<div className = {['text-center'].join(' ')}>
						<input 	
							name = 'editedQuestion'
							value = {this.props.editedQuestion}
							className = {[classes.TextField].join(' ')}
							placeholder = {this.props.editedQuestion}
							onChange={this.props.onChange}/>
							{addBtn}
					</div>

		);
	}

}

export default EditDuration;