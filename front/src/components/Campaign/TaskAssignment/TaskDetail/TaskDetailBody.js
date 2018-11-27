import React, {Component} from 'react'

import classes from './TaskDetail.module.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from '../../../../axios'
import {withRouter} from 'react-router-dom'

class TaskDetailBody extends Component{	
	state ={
		canvasser: null,
		isMounted:false
	}
	componentDidMount(){
		this.setState( { isMounted: true }, () => {
	    	  //change this url
	    	  if(this.props.task){
	    	  	  console.log(['TaskDetailBody'],this.props.task.canvasserId);
		          axios.get('task/canvasser/?_id='+this.props.task.canvasserId).then(response=>{
			           
			          const canvasser = response.data;
			          console.log(['TaskDetailBody'],canvasser);

			          if(this.state.isMounted){
			            this.setState({canvasser:canvasser});
			          }
		          }).catch(error=>{
			        console.log(error)
			      })
      		  }
	        
	    });
	}

	componentWillUnMount(){
		this.setState( { isMounted: false })
	}

	goBackHandler=()=>{
		this.props.history.goBack();
	}


	render(){
		return <div className={['col-12', classes.TaskDetailContainer].join(' ')}> 
				<div className={['row', 'col-9',classes.ItemSection].join(' ')}>
					<div className={['col-6', classes.ItemTitle].join(' ')}>
						Canvasser
					</div>
					<div className={['col-6', classes.Item].join(' ')}>
						{this.state.canvasser?this.state.canvasser.firstName+' '+this.state.canvasser.lastName:null}
						{/*this.props.task.canvasserId*/}
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
						<button className={['btn-light','btn', classes.GoBackBtn].join(' ')} onClick={this.goBackHandler}>Go Back</button>
					</div>
				</div>
			  </div>;
	}

}

export default withRouter(TaskDetailBody);