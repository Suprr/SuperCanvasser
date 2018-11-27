import React, { Component } from "react";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import {withRouter, Route, Switch} from 'react-router-dom'
import axios from '../../../axios'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import './resultMap.css'
import ResultLocationItem from '../../../components/Campaign/CampaignResult/ResultLocationItem'
import classes from './Result.module.css'

class ResultMapView extends Component{

	state = {
		campaign:null,
		isMounted:false,
		locations : null
	}

	componentDidMount(){
	    const cmpId = sessionStorage.getItem('campaignID')
	    this.setState( { isMounted: true }, () => {
	          axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
	           
	          const responseData = response.data[0];

	          //then get locations info by campaign id.
	          axios.get('/manager/result/mapView/?_id='+cmpId).then(res=>{
	           		
		          if(this.state.isMounted){
		            this.setState({campaign:responseData, locations:res.data});               
		          }

		      });
	        }).catch(error=>{
	          console.log(error)
	        })
	    });

   }

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 

    setClassName = (rating)=>{
    	if(rating==1){
    		return 'RankFirst'
    	} else if(rating==2){
    		return 'RankSecond'
    	} else if(rating==3){
    		return 'RankThird'
    	} else if(rating==4){
    		return 'RankFourth'
    	} else{
    		return 'RankFifth'
    	}
    }

    tableViewBtnClickHandler=()=>{
		this.props.history.push('/manager/result/tableView');
    }

    statViewBtnClickHandler=()=>{
    	this.props.history.push('/manager/result/statView');
    }

	render(){
		const position = this.state.locations&&this.state.locations.length>0?[this.state.locations[0].latitude, this.state.locations[0].longitude]:null;
		let count=0;

		const markers = this.state.locations&&this.state.locations.length>0? this.state.locations.map(loc=>{
			const rankClassName = this.setClassName(loc.rating)
			
			let marker =  <Marker key={count++} attribution={count} position={[loc.latitude, loc.longitude]}>
						     <Tooltip  className={rankClassName} direction='center'permanent>
			                       <span>{count}</span>
			                </Tooltip>
						   </Marker>;
		    return marker;

		}) : null;

		let num = 1;
		const locations = this.state.locations&&this.state.locations.length>0? this.state.locations.map(loc =>{
			const color = this.setClassName(loc.rating);
			let location = <ResultLocationItem key= {loc._id} number = {num++} color={color} rating={loc.rating} location={loc.address}/> 
		    return location;
		}): null;

		return(
			<div>
				<PageHead title="Campaign Result - Map View" subtitle={this.state.campaign?this.state.campaign.name:null}/>

				<div className={['row', classes.BtnSection, 'd-flex', 'justify-content-end'].join(' ')}>
						<button className='btn btn-danger' onClick={this.tableViewBtnClickHandler}>Table View</button>
						<button className='btn btn-danger' onClick={this.statViewBtnClickHandler}>Stat View</button>
				</div>

				<div id="map" className = {classes.MapZone}>
					<Map center={position} zoom={13}>
						<TileLayer
					          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
					    {markers}
				  	</Map>		
				</div>

				<div className={classes.CircleSection}>
					<div className={classes.CircleSectionTitle}>
						Rating
					</div>
					<div className={['row', classes.CircleLine].join(' ')}>
						<div className='col-1'>
							<div className={[classes.Circle, classes.Red].join(' ')}></div>
						</div>
						<div className={['col-1'].join(' ')}>5</div>
					</div>

					<div className={['row', classes.CircleLine].join(' ')}>
						<div className='col-1'>
							<div className={[classes.Circle, classes.Yellow].join(' ')}></div>
						</div>
						<div className={['col-1'].join(' ')}>4</div>
					</div>

					<div className={['row', classes.CircleLine].join(' ')}>
						<div className='col-1'>
							<div className={[classes.Circle, classes.Green].join(' ')}></div>
						</div>
						<div className={['col-1'].join(' ')}>3</div>
					</div>
					
					<div className={['row', classes.CircleLine].join(' ')}>
						<div className='col-1'>
							<div className={[classes.Circle, classes.Blue].join(' ')}></div>
						</div>
						<div className={['col-1'].join(' ')}>2</div>
					</div>

					<div className={['row', classes.CircleLine].join(' ')}>
						<div className='col-1'>
							<div className={[classes.Circle, classes.Purple].join(' ')}></div>
						</div>
						<div className={['col-1'].join(' ')}>1</div>
					</div>
				</div>


				<div className={[classes.LocationList].join(' ')}>
					<div className={classes.LocationListHeader}>
						<h6>List</h6>
					</div>
					<div className={['col-9', classes.LocationListBody].join(' ')}>
						{locations}
					</div>
				</div>


			</div>);
	}
}

export default withRouter(ResultMapView);