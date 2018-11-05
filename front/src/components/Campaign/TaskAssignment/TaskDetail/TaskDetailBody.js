import React, {Component} from 'react'

import classes from './TaskDetail.module.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class TaskDetailBody extends Component{	

	render(){
		return <div className={['col-12', classes.TaskDetailContainer].join(' ')}> 
				<div className={['row', 'col-9',classes.ItemSection].join(' ')}>
					<div className={['col-6', classes.ItemTitle].join(' ')}>
						Canvasser
					</div>
					<div className={['col-6', classes.Item].join(' ')}>
						{this.props.task.canvasserId}
					</div>
				</div>

				<div className={['row', 'col-9',classes.ItemSection].join(' ')}>
					<div className={['col-6', classes.ItemTitle].join(' ')}>
						Date
					</div>
					<div className={['col-6', classes.Item].join(' ')}>
						{this.props.task.date}
					</div>
				</div>

				<div className={['row', 'col-9',classes.ItemSection].join(' ')}>
					<div className={['col-6', classes.ItemTitle].join(' ')}>
						Number of Location
					</div>
					<div className={['col-6', classes.Item].join(' ')}>
						{this.props.task.locations.length}
					</div>
				</div>


				<div className={['row', 'col-9',classes.ItemSection].join(' ')}>
					<div className={['col-6', classes.ItemTitle].join(' ')}>
						Locations
					</div>
					<div className={['col-6', classes.Item].join(' ')}>
						<button className={['btn-light','btn', classes.ViewBtn].join(' ')} onClick={this.props.modalOpen}>View</button>
					</div>
				</div>

				<div className={['row', 'col-9',classes.ItemSection].join(' ')}>
					<div className={['col-12', classes.btnSection].join(' ')}>
						<button className={['btn-light','btn', classes.GoBackBtn].join(' ')}>Go Back</button>
					</div>
				</div>
			  </div>;
	}

}

export default TaskDetailBody;