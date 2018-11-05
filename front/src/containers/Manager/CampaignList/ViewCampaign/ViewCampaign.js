import React, { Component } from "react";
import classes from "./ViewCampaign.module.css";

import PageHead from "../../../../components/Layout/PageHead/PageHead";

import ManagerSection from "../../../../components/Campaign/ViewCampaign/ManagerSection";
import DateSection from "../../../../components/Campaign/ViewCampaign/DateSection";
import TalkingPointSection from "../../../../components/Campaign/ViewCampaign/TalkingPointSection";
import QuestionnaireSection from "../../../../components/Campaign/ViewCampaign/QuestionnaireSection";
import VisitDurationSection from "../../../../components/Campaign/ViewCampaign/VisitDurationSection";
import TasksSection from "../../../../components/Campaign/ViewCampaign/TasksSection";

import EditDateSection from "../../../../components/Campaign/ViewCampaign/EditComponents/EditDateSection";


import QuestionnaireList from "../../../../components/Campaign/ViewCampaign/QuestionnaireList";

import Modal from "../../../../components/UI/Modal/Modal";
import {withRouter} from 'react-router-dom'


import axios from '../../../../axios'
class ViewCampaign extends Component {
  state = {
    ...this.props,
    show: false,
    campaign : null,
    managers : null,
    isMounted : false,
    questions : null,
  };

  openModalHandelr = () => {
    this.setState({ show: true });
  };

  modalCloseHandler = () => {
    this.setState({ show: false });
  };

  componentDidMount(){
    const cmpId = sessionStorage.getItem('campaignID')
    console.log(['View Campaign did mount'], cmpId);

    this.setState( { isMounted: true }, () => {
          axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
           
          const responseData = response.data
          const dataLength = responseData.length;
          const newCampaign = responseData[0];

          let managerArray = [];
          for(let i=1; i<dataLength; i++){
            managerArray.push(responseData[i]);
          }
          
          let newQuestionnaire = [];
          for(let i=0; i<newCampaign.questions.length; i++){
            let newQ = {question : newCampaign.questions[i], key : i};
            newQuestionnaire.push(newQ);
          }

          if(this.state.isMounted){
            console.log('ViewCampaign', 'UPLOADED', newQuestionnaire);
            this.setState({campaign:newCampaign,
                           managers:managerArray,
                           questions : newQuestionnaire});
          }
        }).catch(error=>{
          console.log(error)
        })
    });


    ////////
     // let cmpIndex = this.props.match.params.id;
     // axios.get('https://cse308-de3df.firebaseio.com/campaigns/'+cmpIndex+'.json').then(response=>{
     //      let x= response.data
     //      let newCampaign = x;
     //      // let newCampaigns = [];
     //      //console.log(['ViewCmp componentDidMount'], newCampaign);
     //      // for(let c in campaignIndexes){
     //      //   if(x[c]){
     //      //     newCampaigns.push(x[c]);
     //      //   }
     //      // }
     //      this.setState({campaign:newCampaign});
     //      // this.setState({campaigns : newCampaigns});
     //      // this.props.campaignSet(newCampaigns);
     //      //this.setState({campaigns : response.data.campaigns})
     //  });     
      
     // console.log(['View Task'], this.props);

   }
  
  componentWillUnMount(){
    this.setState({isMounted:false});
  }
  
  editButtonClickHandler=(event)=>{
    //console.log(['viewClickHandler'], campaign_id, 'props : ',this.props);
    // const cmpId = sessionStorage.getItem('campaignID');
    //sessionStorage.setItem('campaignID', cmpId);
    this.props.history.push('/manager/campaign/edit');
  }

  render() {
    //console.log('[Veiw Campaign]', this.state.campaign)
    console.log(['View Campaign Props'], this.props);
   // let campaign = this.props.campaign[parseInt(this.props.match.params.index)];
  	let cmpaign = this.state.campaign ? (<div className={[classes.ViewCampaign].join(" ")}>
        <Modal show={this.state.show} modalClosed={this.modalCloseHandler}>
          <QuestionnaireList questionnaire={this.state.questions} id={this.state.campaign._id} />
        </Modal>
        <PageHead title="View Campaign" subtitle={this.state.campaign.name} />

        <div className={[classes.Components, "container"].join(" ")}>
          <div className="row">
            <button onClick={this.editButtonClickHandler}>Edit</button>
          </div>
          <div className="row justify-content-center">
            <ManagerSection managers={this.state.campaign.managers} id={this.state.campaign._id}/>
          </div>
          <div className="row justify-content-center">
            <DateSection
              startDate={this.state.campaign.startDate}
              endDate={this.state.campaign.endDate}
              id={this.state.campaign._id}
            />
            
          </div>
          <div className="row justify-content-center">
            <TalkingPointSection talkingPoint={this.state.campaign.talkingPoints} id={this.state.campaign._id}/>
          </div>
          <div className="row justify-content-center">
            <QuestionnaireSection
              showModal={this.state.show}
              clickedHandler={this.openModalHandelr}
            />
          </div>
          <div className="row justify-content-center">
            <VisitDurationSection duration={this.state.campaign.avgDuration} id={this.state.campaign._id}/>
          </div>
          <div className="row justify-content-center">
            <TasksSection tasks={this.state.campaign.tasks} id={this.state.campaign._id} url = {this.props.match.url} history ={this.props.history}/>
          </div>
        </div>
      </div>) : null;
    
    return (
      <div>
      {cmpaign}
      </div>
    );

  }
}

export default withRouter(ViewCampaign);
