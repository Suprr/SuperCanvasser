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
            this.setState({campaign:newCampaign,
                           managers:managerArray,
                           questions : newQuestionnaire});
          }
        }).catch(error=>{
          console.log(error)
        })
    });

   }
  
  componentWillUnMount(){
    this.setState({isMounted:false});
  }
  
  editButtonClickHandler=(event)=>{
    this.props.history.push('/manager/campaign/edit');
  }

  render() {

  	let cmpaign = this.state.campaign ? (<div className={[classes.ViewCampaign].join(" ")}>
        <Modal show={this.state.show} modalClosed={this.modalCloseHandler}>
          <QuestionnaireList questionnaire={this.state.questions} id={this.state.campaign._id} />
        </Modal>
        <PageHead title="View Campaign" subtitle={this.state.campaign.name} />

        <div className={[classes.Components, "container"].join(" ")}>
          <div className="row">
           {this.state.campaign.status=='INACTIVE'?<button className={['btn','btn-light', classes.EditBtn].join(' ')} onClick={this.editButtonClickHandler}>Edit</button> : null}
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
