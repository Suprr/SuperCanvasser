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
  
  componentWillReceiveProps(nextProps){
    if(!this.state.campaignList){
      this.setState({campaignList : nextProps.campaignList});
    }
  }

  componentDidMount(){
    console.log(['componentWillMount List']);

    if(!this.state.campaigns){
      //console.log("First PAsS");
      axios.get('https://cse308-de3df.firebaseio.com/campaigns.json').then(response=>{
          let x= response.data 
          let campaignIndexes = this.state.campaignList;
          let newCampaigns = [];
          for(let c in campaignIndexes){
            if(x[c]){
              newCampaigns.push(x[c]);
            }
          }

          this.setState({campaigns : newCampaigns});
          this.props.campaignSet(newCampaigns);
          //this.setState({campaigns : response.data.campaigns})
      });     
    }
    

    // axios.get('https://cse308-de3df.firebaseio.com/managers/'+this.state.currentID+'.json').then(response=>{
    //       let x= response.data 
    //       console.log(['CampaignList Data'],x);
    //       this.setState({campaigns : response.data.campaigns})
    //   });
  }



  render() {
    console.log('[List] campaigns : ',this.state.campaigns);
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
