
import React, { Component } from "react";
import {withRouter, Route, Switch} from 'react-router-dom'
import axios from '../../../axios'
import classes from './CampaignResult.module.css'
import TableViewLocations from './TableViewLocations'
class TableViewTaskSection extends Component{
	state = {
		locations: null,
		isMounted:false

	}

	 componentDidMount(){
	 	console.log(['TableViewTaskSection'], this.props.task);
	


	    if(this.props.task){
			
			this.setState( { isMounted: true }, () => {
			  
			       //axios then axios get locations by sending task ID
			       //so I can get questionnaire infos from backend. 
			       axios.post('/task/locations', this.props.task.locations).then(response=>{
		        
				        let locationData= response.data 
				          //get tasks id from campaign
				        if(this.state.isMounted){
				            console.log(['TableViewTaskSection'], locationData);
				            this.setState({locations:locationData});
				        }

	        	});
		
	 	 	});
		}
			

    }

 //   componentDidUpdate(prevProps) {
 //   		console.log(['TableViewTaskSection Update'], this.props.task);
		
	// 	if (this.props.task !== prevProps.task) {
	// 	    if(this.props.task){
				
	// 			this.setState( { isMounted: true }, () => {
				  
	// 			       //axios then axios get locations by sending task ID
	// 			       //so I can get questionnaire infos from backend. 
	// 			       axios.post('/task/locations', this.props.task.locations).then(response=>{
			        
	// 				        let locationData= response.data 
	// 				          //get tasks id from campaign
	// 				        if(this.state.isMounted){
	// 				            console.log(['TableViewTaskSection'], locationData);
	// 				            this.setState({locations:locationData});
	// 				        }

	// 	        });
			
	// 	 	 });
	// 		}
	// 	}
	// }

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 

	render(){
		const locs = this.state.locations? this.state.locations.map(loc=>{
			return <TableViewLocations key={loc._id} location = {loc}/>
		}):null;

		return <div className={classes.TableViewTask}>
					<div className={classes.TableViewHead}>
						{'Task'+this.props.number}
					</div>
					<div className={['row', classes.TableViewItem].join(' ')}>
						<div className={['col-3', classes.TableViewAttr].join(' ')}>
							Date
						</div>
						<div className={['col-9', classes.TableViewAttrText].join(' ')}>
							{this.props.task.date}
						</div>
					</div>

					<div className={[classes.Locations].join(' ')}>
							{locs}
					</div>
			   </div>
	}
}

export default TableViewTaskSection; 