import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import EditQNR from './EditComponents/EditQNR'
class QuestionnaireComponent extends Component{
	state = {
		...this.props,
		showEdit : false,
		editedQuestion : ''
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
			question : this.state.editedQuestion,
			showEdit:false}));
	}

	render(){

		let showingComponent = this.state.showEdit? <EditQNR onChange={this.onChangeHandler}  editedQuestion={this.state.editedQuestion} /> : this.props.question;
		
		let btn = this.state.showEdit? 
				(<button className = {[classes.QNRCompBtn,'btn', 'btn-danger', 'col-1'].join(' ')} onClick={(event)=>this.editHandler(event)} name={this.props.btnID}>submit</button>)
				: (<button className = {[classes.QNRCompBtn,'btn', 'btn-danger', 'col-1'].join(' ')} onClick={(event)=>this.showEditComponentHandler(event)} name={this.props.btnID}>edit</button>);

		return (
			<div className={[classes.QNRComp,'row', 'justify-content-center'].join(' ')}>
				<div  className ={[classes.QNRItem,'col-9'].join(' ')}>{showingComponent}</div> 
				{btn} 
				<button className = {[classes.QNRCompBtn,'btn', 'btn-danger', 'col-1'].join(' ')} name={this.props.btnID}>-</button>
			</div>
		)
	}
}

export default QuestionnaireComponent;