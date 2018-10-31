import React, {Component} from 'react'
import classes from './Availability.module.css'


class Canvasser extends Component{
	state = {...this.props,
		selectedCanvasser : null}

	
	

	render(){
		let canvasser = this.props.canvasser?this.props.canvasser.name : null
		return (
			<div className = {['row', classes.Section].join(' ')}>
				<div className = {['col-3'].join(' ')}>
					<h4> Canvasser </h4>
				</div>
				<div className = {['col-6', classes.CanvasserName].join(' ')}>
					<h4>{canvasser}</h4>
				</div>
				<div className = {['col-3'].join(' ')}>
					<button className = {['btn','btn-light', classes.SearchBtn].join(' ')} onClick={this.props.modalOpen}>Search</button>
				</div>

			</div>
		);

	}
}

export default Canvasser