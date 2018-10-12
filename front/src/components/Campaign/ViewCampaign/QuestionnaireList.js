import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'

class QuestionnaireList extends Component{
	state={
		...this.props
	}


	render(){
		let questionnaire = this.state.questionnaire.map(qnr =>{
			let question = (<div key = {qnr.id} className ={classes.QNRItem}>{qnr.question}</div> )
		    return question;
		  });   

		return(
			<div className='row justify-content-center'>
				<div className = {[classes.QNRListSection, 'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-11', classes.Title].join(' ')}>Questionnaire</h4> 
						<button className = 'btn btn-danger col-1'>edit</button>
					</div>
					
					<div className = 'row justify-content-center'>
						<div className = {['text-center', classes.QNRListBody].join(' ')}>
							{questionnaire}
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default QuestionnaireList;