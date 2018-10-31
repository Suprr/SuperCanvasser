import React, {Component} from 'react'
import classes from './Availability.module.css'

class CanvList extends Component{


	render(){
		return (
				<div className = {[classes.singleCanvasser].join(' ')}>
					<button value={this.props.id} 
						onClick = {(event)=>this.props.selectCanvasser(this.props.canvasser)}> 
						{this.props.name}
					</button>
				</div>);
	}
}

export default CanvList