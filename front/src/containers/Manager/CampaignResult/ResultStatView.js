import React, { Component } from "react";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import {withRouter, Route, Switch} from 'react-router-dom'
import axios from '../../../axios'
import classes from './Result.module.css'

class ResultStatView extends Component{

	state = {
		campaign:null,
		isMounted:false
	}
	componentDidMount(){
	    const cmpId = sessionStorage.getItem('campaignID')
	    this.setState( { isMounted: true }, () => {
	          axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
	           
	          const responseData = response.data[0];
	          
	          if(this.state.isMounted){
	            this.setState({campaign:responseData});               
	          }
	        }).catch(error=>{
	          console.log(error)
	        })
	    });

   }

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 

    tableViewBtnClickHandler=()=>{
		this.props.history.push('/manager/result/tableView');
    }

    mapViewBtnClickHandler=()=>{
    	this.props.history.push('/manager/result/mapView');
    }

	render(){

		return(
			<div>
				<PageHead title="Campaign Result - Statistical View" subtitle={this.state.campaign?this.state.campaign.name:null}/>


				<div className={['row', classes.BtnSection, 'd-flex', 'justify-content-end'].join(' ')}>
						<button className='btn btn-danger' onClick={this.tableViewBtnClickHandler}>Table View</button>
						<button className='btn btn-danger' onClick={this.mapViewBtnClickHandler}>Map View</button>
				</div>

			</div>);
	}
}

export default withRouter(ResultStatView);