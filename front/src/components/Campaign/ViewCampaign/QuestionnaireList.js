import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import QuestionnaireComponent from './QuestionnaireComponent'
import EditQNR from './EditComponents/EditQNR'
import axios from '../../../axios'

class QuestionnaireList extends Component{
	state={
		...this.props,
		showAdd : false,
		editedQuestion : ''
	}


	
	

	// onChangeHandler=(event)=>{
	// 	this.setState({[event.target.name] : event.target.value});
	// }

	//Edit questionniare list from questionnaire component
	// editHandler=(newQuestion, qKey)=>{
	// 	let newQuestionnaire = [];

	// 	for(let q in this.state.questionnaire){
	// 		let currentQ=this.state.questionnaire[q]

	// 		console.log('EditHandler', currentQ.id, 'key : ',qKey);
	// 		if(currentQ.id!=qKey){
	// 			console.log('push', currentQ)
	// 			newQuestionnaire.push(currentQ);
	// 		}else{
				
	// 			let newQ = {
	// 				question : newQuestion, 
	// 				key:qKey
	// 			}
	// 			console.log('push', newQ)
	// 			newQuestionnaire.push(newQ);	
	// 		}
	// 	}

	// 	console.log(newQuestionnaire);
	// 	this.setState((prevState)=>({
	// 		questionnaire : newQuestionnaire
	// 	}));

	// 	console.log('EditHandler');
	    
	//     //PUT NEW CAMPAIGN 
	//     // axios.put('/campaigns/'+this.props.id+'/questionnaire.json/', newQuestionnaire).then( response => {  
	//     //           console.log("Success", this.state.newQuestionnaire);
	//     //   })
	//     //   .catch( error => {
	//     //       console.log("Error", error);
	//     // });
	// }

	//This method for showing textfield component
	// addHandler=(event)=>{
	// 	this.setState((prevState)=>({
	// 		showAdd : true
	// 	}));
	// }

	// addQuestionHandler = (event) =>{
		
	// 	let newQuestion = {
	// 		question : this.state.editedQuestion,
	// 		key : this.state.questionnaire.length
	// 	} 
	// 	console.log('[addQuestionHandler]', newQuestion);
	// 	this.state.questionnaire.push(newQuestion);
	// 	this.setState((prevState)=>({
	// 		showAdd : false
	// 	}));

		// axios.put('/campaigns/'+this.props.id+'/questionnaire.json/', this.state.questionnaire).then( response => {  
	 //              console.log("Success", this.state.questionnaire);
	 //      })
	 //      .catch( error => {
	 //          console.log("Error", error);
	 //    });

	//}

	// addedQuestionChange=(event)=>{
	// 	this.setState({editedQuestion : event.target.value})

	// }


	render(){

		let questionnaire =  this.state.questionnaire? this.state.questionnaire.map(qnr =>{
			let question = (<QuestionnaireComponent key = {qnr.key} btnID = {qnr.key} question={qnr.question}/> )
		    return question;
		  }) : null;
		
		//let displayedComponent = this.state.showAdd? <EditQNR editedQuestion = {this.state.editedQuestion} onClick = {this.addQuestionHandler} onChange={this.addedQuestionChange} type='add' />  : null ;
		return(
			<div className='row justify-content-center'>
				<div className = {[classes.QNRListSection, 'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-10', classes.Title].join(' ')}>Questionnaire</h4> 
					</div>
					{/*displayedComponent*/}
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