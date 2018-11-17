import React, { Component } from "react";
import Campaign from "../../../components/Campaign/Campaign";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import ViewCampaign from "./ViewCampaign/ViewCampaign"
import {withRouter, Route, Switch} from 'react-router-dom'

import axios from '../../../axios'
class CampaignList extends Component {
  state = {
    campaigns: null,
    clicked : false, 
    index : '',
    isMounted : false
  };

  campaignViewClickHandler=(event)=>{
  		const target = event.target;
  		const count = target.name;

  		this.setState({index : count});
  		this.setState({clicked:true});
  }
  
  componentDidMount(){
    //console.log(['Manager componentDidMount'], this.state.campaignList);
     let x = null
     //userID is id from session store
     const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
    //const data = sessionStorage.getItem('userInfo');
     const userID = userInfoData._id;
     console.log('USER ID', userID);
     //const userID = getSessionStore.
     this.setState( { isMounted: true }, () => {
         axios.get('/manager/campaign/list/?_id='+userID).then(response=>{
            
            const data = response.data;
            
            const length = data.length;
            let newCampaigns = []
            for(let i=0; i<length; i++){
              newCampaigns.push(data[i]);
            }

            if(this.state.isMounted){

              console.log('CampaignList', 'UPLOADED');
              this.setState({campaigns:newCampaigns});
            }
        }).catch(error=>{
          console.log('USER ID Error', userID);
          console.log(error)
        })
    } );
      
  }

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 


  render() {
  	let campaigns = null;
  	if(this.state.campaigns){
	  		let count = 0;
		    campaigns = this.state.campaigns.map(cpg => {
		      let campaign = null;
		      campaign = <Campaign key={cpg._id} id={cpg._id} url={this.props.match.url} name = {count++} campaign={cpg} onClick={this.campaignViewClickHandler}/>;
		      return campaign;
		    });  
		} else{
			campaigns = <h1> No campaing List</h1>
		}

  console.log('[List]',this.props.match.url);
    return (
      <div>
        <PageHead title="Campaign List" />
        <div className="row">{campaigns}</div>
      </div>

    );
  }
}

export default withRouter(CampaignList);
