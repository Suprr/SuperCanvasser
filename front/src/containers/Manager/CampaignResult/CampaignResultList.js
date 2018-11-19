import React, { Component } from "react";
import Campaign from "../../../components/Campaign/Campaign";
import PageHead from "../../../components/Layout/PageHead/PageHead";
//import ViewCampaign from "./ViewCampaign/ViewCampaign"
import {withRouter, Route, Switch} from 'react-router-dom'

import axios from '../../../axios'

class CampaignResultList extends Component {
  state = {
    campaigns: null,
    clicked : false, 
    index : '',
    isMounted : false
  };
  
  componentDidMount(){
    
     const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
    
     const userID = userInfoData._id;
     
     this.setState( { isMounted: true }, () => {
         axios.get('/manager/campaign/list/?_id='+userID).then(response=>{
            
            const data = response.data;
            
            const length = data.length;
            let newCampaigns = []
            for(let i=0; i<length; i++){
              if(data[i].status=='COMPLETED')
                newCampaigns.push(data[i]);
            }

            if(this.state.isMounted){

              this.setState({campaigns:newCampaigns});
            }
        }).catch(error=>{
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
		      campaign = <Campaign campaignView={false} key={cpg._id} id={cpg._id} url={this.props.match.url} name = {count++} campaign={cpg}/>;
		      return campaign;
		    });  
		} else{
			campaigns = <h1> No Campaing Result List</h1>
		}

  console.log('[List]',this.props.match.url);
    return (
      <div>
        <PageHead title="Campaign Result List" />
        <div className="row">{campaigns}</div>
      </div>

    );
  }
}

export default withRouter(CampaignResultList);
