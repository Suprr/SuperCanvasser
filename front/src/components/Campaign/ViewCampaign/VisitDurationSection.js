import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import EditDuration from './EditComponents/EditDuration'
import axios from '../../../axios'
class VisitDurationSection extends Component{
	state = {
		...this.props,
		showEdit : false,
		editedHour : '',
		editedMin : ''
	}

	// showEditComponentHandler(){
	// 	this.setState((prevState)=>({
	// 		showEdit: true
	// 	}));
	// }

	// onChangeHandler=(event)=>{
	// 	this.setState({[event.target.name] : event.target.value});
	// }

	// editHandler(){
	// 	let newDuration = this.state.editedHour + 'H '+this.state.editedMin+'M'
	// 	this.setState((prevState)=>({
	// 		duration : newDuration,
	// 		showEdit:false}));

		
	// 	axios.put('/campaigns/'+this.props.id+'/duration.json/', JSON.stringify(newDuration)).then( response => {  
	//               console.log("Success", this.state.duration);
	//       })
	//       .catch( error => {
	//           console.log("Error", error);
	//     });

	// }	

	render(){

		// let showingComponent = this.state.showEdit? <EditDuration editedHour = {this.state.editedHour} editedMin = {this.state.editedMin} onChange = {this.onChangeHandler} onClick={(event)=>this.editHandler(event)}/> 
		// 										  :(<div className = {['text-center', classes.VDBody].join(' ')}>{this.state.duration}</div>) ;
		let showingComponent = <div className = {['text-center', classes.VDBody].join(' ')}>{this.state.duration}</div>
		//let editButton = this.state.showEdit ? null :(<button className = 'btn btn-danger col-1' onClick = {(event)=>this.showEditComponentHandler(event)}>edit</button>) ;
		return(
			<div className = {[classes.VDSection, 'col-10', 'text-center'].join(' ')}>
				<div className = {['row'].join(' ')}>
					<h4 className={['col-11', classes.Title].join(' ')}>Visit Duration</h4> 
					{/*editButton*/}
				</div>
				
				<div className = 'row justify-content-center'>
					{showingComponent}
				</div>

				
			</div>
		);
	}

}

export default VisitDurationSection;