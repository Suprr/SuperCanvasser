import React, {Component} from 'react'
import classes from './Availability.module.css'
import axios from '../../../axios'
import CanvList from './CanvList'

class SearchCanvasser extends Component{
	state = {
		...this.props,
		canvassers : [],
		show : this.props.show,
		listed : false
	}

	selectCanvasser = (canv) =>{
		for(let i=0; i<this.state.canvassers.length; i++){
			if(this.state.canvassers[i]==canv){
				this.state.setSelectCanvasser(canv);
				this.props.modalClosed();
				break;
			}
		}
			
	}
	
	componentDidMount(){
		if(!this.state.listed){
     		axios.get('https://cse308-de3df.firebaseio.com/canvasser.json').then(response=>{
	          	let x= response.data
	          	let canvassers = x;
	          	this.setState({canvassers:canvassers});
	          	this.setState({listed:true});
     		 });     
     	}
	}

	render(){
		let canvasserList =  this.state.canvassers.map(canvasser =>{
			return <CanvList key={canvasser.id} selectCanvasser = {this.selectCanvasser} name = {canvasser.name} canvasser={canvasser} />
		  });
		
		return (
			<div>
				<div className = {['row', 'justify-content-center', classes.ListHeader].join(' ')}>
					<h4>Available Canvassers</h4>
				</div>
				<div className = {['row', 'justify-content-center', classes.ListSection].join(' ')}>
					{canvasserList}
				</div>
			</div>
		);
	}
}

export default SearchCanvasser