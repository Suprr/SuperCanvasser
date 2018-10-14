import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import QuestionnaireComponent from './QuestionnaireComponent'

class QuestionnaireList extends Component{
	state={
		...this.props,
		showEdit : false,
		addedQuestion : ''
	}

	showEditComponentHandler(){
		this.setState((prevState)=>({
			showEdit: true
		}));
	}

	onChangeHandler=(event)=>{
		this.setState({[event.target.name] : event.target.value});
	}

	editHandler(){
		this.setState((prevState)=>({
			talkingPoint : this.state.addedQuestion,
			showEdit:false}));
	}

	render(){
		let questionnaire = this.state.questionnaire.map(qnr =>{
			let question = (<QuestionnaireComponent key = {qnr.id} btnID = {qnr.id} question={qnr.question}/> )
		    return question;
		  });   

		return(
			<div className='row justify-content-center'>
				<div className = {[classes.QNRListSection, 'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-10', classes.Title].join(' ')}>Questionnaire</h4> 
						<button className = {[classes.QNRCompBtn,'btn', 'btn-danger', 'col-1'].join(' ')} name={this.props.btnID}>+</button>
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