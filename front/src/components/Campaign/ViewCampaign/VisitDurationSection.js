import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import EditDuration from './EditComponents/EditDuration'

class VisitDurationSection extends Component{
	state = {
		...this.props,
		showEdit : false,
		editedHour : '',
		editedMin : ''
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
			duration : this.state.editedHour + 'H '+this.state.editedMin+'M',
			showEdit:false}));
	}	

	render(){

		let showingComponent = this.state.showEdit? <EditDuration editedHour = {this.state.editedHour} editedMin = {this.state.editedMin} onChange = {this.onChangeHandler} onClick={(event)=>this.editHandler(event)}/> 
												  :(<div className = {['text-center', classes.VDBody].join(' ')}>{this.state.duration}</div>) ;

		let editButton = this.state.showEdit ? null :(<button className = 'btn btn-danger col-1' onClick = {(event)=>this.showEditComponentHandler(event)}>edit</button>) ;
		return(
			<div className = {[classes.VDSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Visit Duration</h4> 
					{editButton}
				</div>
				
				<div className = 'row justify-content-center'>
					{showingComponent}
				</div>

				
			</div>
		);
	}

}

export default VisitDurationSection;