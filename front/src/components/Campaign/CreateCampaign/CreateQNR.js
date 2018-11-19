import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class CreateQNR extends Component{
	

	render(){
		return(
			<div className={[classes.Section, 'row'].join(' ')}>
				<div className='col-3 text-center'> 
					<p>New Questionnaire</p>
				</div>
				
				<div className = {['col-6', classes.InputSection].join(' ')}>
					<input 	
							name = 'newQuestionnaire'
							value = {this.props.questionnaire}
							className = {[classes.TextField].join(' ')}
							onChange={this.props.onChange}/>
				</div>

				<div className='col-2 text-center'> 
					<div className='row'>
						<button className = {['btn', 'btn-danger', classes.Btn].join(' ')} onClick = {this.props.onClick}>Add</button>
					</div>
				</div>
			</div>
		);
	}

}

export default CreateQNR;