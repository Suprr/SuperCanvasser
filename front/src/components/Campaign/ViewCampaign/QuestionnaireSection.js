import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class QuestionnaireSection extends Component{
	state={
		...this.props
	}


	render(){

		return(
			<div className = {[classes.QNRSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Questionnaire</h4> 
					<button className = 'btn btn-danger col-1'>edit</button>
				</div>
				
				<div className = 'row justify-content-center'>
					<div className = {['text-center', classes.QNRBody].join(' ')}>
						<button className = 'btn btn-light ViewBtn' onClick={this.state.clickedHandler}>View</button>
					</div>
				</div>
			</div>
		);
	}

}

export default QuestionnaireSection;