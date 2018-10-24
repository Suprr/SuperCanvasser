import React, { Component } from "react";
import Campaign from "../../../components/Campaign/Campaign";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import ViewCampaign from "./ViewCampaign/ViewCampaign"
import {withRouter, Route, Switch} from 'react-router-dom'

import axios from '../../../axios'
class CampaignList extends Component {
  state = {
    campaignList : this.props.campaignList,
    campaigns:null,
    clicked : false, 
    index : '',
  };

  campaignViewClickHandler=(event)=>{
  		const target = event.target;
  		const count = target.name;

  		this.setState({index : count});
  		this.setState({clicked:true});
  }
  getDerivedStateFromProps(props, state){
    console.log('[List getDerivedStateFromProps', this.props.campaignList)
  }
  
  componentDidMount(){
    console.log(['List componentDidMount '], this.props.campaignList);

    if(!this.state.campaigns&&this.props.campaignList){
      
      axios.get('https://cse308-de3df.firebaseio.com/campaigns.json').then(response=>{
          let x= response.data 
          let campaignIndexes = this.props.campaignList;
          let newCampaigns = [];
          for(let c in campaignIndexes){
            if(x){
              newCampaigns.push(x[campaignIndexes[c]]);
            }
          }

          this.setState((prevState)=>({campaigns : newCampaigns}));
          this.props.campaignSet(newCampaigns);
      });     
    }
    
  }

  componentDidUpdate(){
    console.log(['List componentDidUpdate'], this.props);
    if(!this.state.campaigns&&this.state.campaignList){
      axios.get('https://cse308-de3df.firebaseio.com/campaigns.json').then(response=>{
          let x= response.data 
          let campaignIndexes = this.state.campaignList;
          let newCampaigns = [];
          for(let c in campaignIndexes){
            if(x){
              newCampaigns.push(x[campaignIndexes[c]]);
            }
          }

          this.setState((prevState)=>({campaigns : newCampaigns}));
          this.props.campaignSet(newCampaigns);
      });     
    }
    
  }

  componentWillReceiveProps(nextProps){

    console.log(['componentWillReceiveProps List'], nextProps.campaignList);

    if(!this.state.campaignList){
      this.setState({campaignList : nextProps.campaignList});
    }
  }

  



  render() {
    console.log('[List, RENDER] campaigns : ',this.state.campaigns);
  	let campaigns = null
  	//if(!this.state.clicked){
  	if(this.state.campaigns&&this.state.campaigns.length!=0){
      console.log('[List Render] HEre');
	  		let count = 0;
		    campaigns = this.state.campaigns.map(cpg => {
		      let campaign = null;
		      campaign = <Campaign key={cpg.id} id={cpg.id} url={this.props.match.url} name = {count++} campaign={cpg} onClick={this.campaignViewClickHandler}/>;

		      return campaign;
		    });  
		} else{
      console.log('[List Render] MAYBE');
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
