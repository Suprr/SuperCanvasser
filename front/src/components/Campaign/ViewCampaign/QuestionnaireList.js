import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import QuestionnaireComponent from './QuestionnaireComponent'
import EditQNR from './EditComponents/EditQNR'

class QuestionnaireList extends Component{
	state={
		...this.props,
		showAdd : false,
		editedQuestion : ''
	}


	
	

	onChangeHandler=(event)=>{
		this.setState({[event.target.name] : event.target.value});
	}

	//Edit questionniare list from questionnaire component
	editHandler=(newQuestion, qKey)=>{
		let newQuestionnaire = [];

		for(let q in this.state.questionnaire){
			let currentQ=this.state.questionnaire[q]

			console.log('EditHandler', currentQ.id, 'key : ',qKey);
			if(currentQ.id!=qKey){
				console.log('push', currentQ)
				newQuestionnaire.push(currentQ);
			}else{
				
				let newQ = {
					question : newQuestion, 
					answer:null,
					id:qKey
				}
				console.log('push', newQ)
				newQuestionnaire.push(newQ);	
			}
		}

		console.log(newQuestionnaire);
		this.setState((prevState)=>({
			questionnaire : newQuestionnaire
		}))
	}

	//This method for showing textfield component
	addHandler=(event)=>{
		this.setState((prevState)=>({
			showAdd : true
		}));
	}

	addQuestionHandler = (event) =>{
		
		let newQuestion = {
			question : this.state.editedQuestion,
			answer : null,
			id : this.state.questionnaire.length
		} 
		console.log('[addQuestionHandler]', newQuestion);
		this.state.questionnaire.push(newQuestion);
		this.setState((prevState)=>({
			showAdd : false
		}));
	}

	addedQuestionChange=(event)=>{
		this.setState({editedQuestion : event.target.value})
	}


	render(){

		let questionnaire =  this.state.questionnaire? this.state.questionnaire.map(qnr =>{
			let question = (<QuestionnaireComponent edit = {this.editHandler} key = {qnr.id} btnID = {qnr.id} question={qnr.question}/> )
		    return question;
		  }) : null;

		let displayedComponent = this.state.showAdd? <EditQNR editedQuestion = {this.state.editedQuestion} onClick = {this.addQuestionHandler} onChange={this.addedQuestionChange} type='add' />  : null ;
		return(
			<div className='row justify-content-center'>
				<div className = {[classes.QNRListSection, 'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-10', classes.Title].join(' ')}>Questionnaire</h4> 
						<button className = {[classes.QNRCompBtn,'btn', 'btn-danger', 'col-1'].join(' ')} onClick={this.addHandler}>+</button>
					</div>
					{displayedComponent}
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