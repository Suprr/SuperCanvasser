import React, { Component } from "react";
import Campaign from "../../../components/Campaign/Campaign";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import ViewCampaign from "./ViewCampaign/ViewCampaign"
import {withRouter, Route, Switch} from 'react-router-dom'
class CampaignList extends Component {
  state = {
    campaigns: this.props.campaigns,
    clicked : false, 
    index : ''
  };

  campaignViewClickHandler=(event)=>{
  		const target = event.target;
  		const count = target.name;

  		this.setState({index : count});
  		this.setState({clicked:true});
  }

  render() {
  	let campaigns = null
  	//if(!this.state.clicked){
  	if(this.state.campaigns){
	  		let count = 0;
		    campaigns = this.state.campaigns.map(cpg => {
		      let campaign = null;
		      campaign = <Campaign key={cpg.id} id={cpg.id} url={this.props.match.url} name = {count++} campaign={cpg} onClick={this.campaignViewClickHandler}/>;

		      return campaign;
		    });  
		} else{
			campaigns = <h1> No campaing List</h1>
		}


	//} else{
   // <Route path={this.props.match.url+'/view-campaign-list/:id'} 
      //                 render={()=> <ViewCampaign campaign = {this.state.campaigns[this.state.index]}/>}/>
		// campaigns = <Route path={this.props.location.pathname+'/:cpg-id'} 
  //                 render={()=><ViewCampaign campaign = {this.state.campaigns[this.state.index]}/>}/>;
	//}
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
