import React, {Component} from 'react'
import classes from './TaskDetail.module.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './map.css'
import axios from '../../../../axios'

import LocationItem from './LocationItem'

class Locations extends Component{
	state = {
		locations : null
	}

	componentDidMount(){
		const locationsID = this.props.locations;
	    console.log(['View Campaign did mount'], locationsID);

	    this.setState( { isMounted: true }, () => {
	    	  //change this url

          axios.post('/task/locations', locationsID).then(response=>{
           
	          const responseData = response.data;
	         
	          console.log(['View Task Data'],responseData);

	          if(this.state.isMounted){
	            console.log('Locations Component Didmount', 'UPLOADED');
	            this.setState({locations:responseData});
	          }

	        }).catch(error=>{
	          console.log(error)
	        })
	    });
	}

	componentWillUnMount(){

	}
	
	render(){
		const position = this.state.locations&&this.state.locations.length>0?[this.state.locations[0].latitude, this.state.locations[0].longitude]:null;
		let count=0;

		const markers = this.state.locations&&this.state.locations.length>0? this.state.locations.map(loc=>{
			let marker =  <Marker key={count++} position={[loc.latitude, loc.longitude]}>
						     <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
						   </Marker>;
		    return marker;
		}) : null;

		let num = 1;
		const locations = this.state.locations&&this.state.locations.length>0? this.state.locations.map(loc =>{
			let location = <LocationItem key= {loc._id} number = {num++} location={loc.address}/> 
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