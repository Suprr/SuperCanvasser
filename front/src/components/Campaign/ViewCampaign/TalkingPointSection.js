import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import EditTalkingPointComponent from './EditComponents/EditTalkingPointComponent'

class TalkingPointSection extends Component{
	state = {
		...this.props,
		showEdit : false,
		editedTalkingPoint: this.props.talkingPoint
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
			talkingPoint : this.state.editedTalkingPoint,
			showEdit:false}));
	}

	render(){
		let showingComponent = this.state.showEdit ? <EditTalkingPointComponent onClick={(event)=>this.editHandler(event)} onChange={this.onChangeHandler} editedTalkingPoint = {this.state.editedTalkingPoint}/>
												 : (<div className = 'row justify-content-center'><div className = {['text-center', classes.TPBody].join(' ')}>{this.state.talkingPoint}</div></div>);
		
		let editButton = this.state.showEdit ? null : <button className = 'btn btn-danger col-1' onClick={(event)=>this.showEditComponentHandler(event)}>edit</button>;
				
		return(
			<div className = {[classes.TPSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Talking Point</h4> 
					{editButton}
				</div>
				
				{showingComponent}
			</div>
		);
	}

}

export default TalkingPointSection;