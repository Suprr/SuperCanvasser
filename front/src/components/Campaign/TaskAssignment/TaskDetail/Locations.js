import React, {Component} from 'react'
import classes from './TaskDetail.module.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './map.css'

import LocationItem from './LocationItem'

class Locations extends Component{

	
	render(){
		const position = this.props.locations&&this.props.locations.length>0?[this.props.locations[0].lat, this.props.locations[0].long]:null;
		let count=0;

		const markers = this.props.locations&&this.props.locations.length>0? this.props.locations.map(loc=>{
			let marker =  <Marker key={count++} position={[loc.lat, loc.long]}>
						     <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
						   </Marker>;
		    return marker;
		}) : null;

		let num = 1;
		const locations = this.props.locations&&this.props.locations.length>0? this.props.locations.map(loc =>{
			let location = <LocationItem key= {loc.id} number = {num++} location={loc.location}/> 
		    return location;
		}): null;

		return <div className={classes.LocationContainer}>
					<div className={classes.MapHeader}>
						<h6>Locations</h6>
					</div>
					<div id="map" className = {classes.MapZone}>
						<Map center={position} zoom={13}>
							<TileLayer
						          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
						    {markers}
					  	</Map>		
				</div>
				<div className={[classes.LocationList].join(' ')}>
					<div className={classes.LocationListHeader}>
						<h6>List</h6>
					</div>
					<div className={['col-9', classes.LocationListBody].join(' ')}>
						{locations}
					</div>
				</div>

			</div>;
	}
}

export default Locations;