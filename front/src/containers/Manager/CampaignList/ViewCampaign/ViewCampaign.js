import React, { Component } from "react";
import classes from "./ViewCampaign.module.css";

import PageHead from "../../../../components/Layout/PageHead/PageHead";

import ManagerSection from "../../../../components/Campaign/ViewCampaign/ManagerSection";
import DateSection from "../../../../components/Campaign/ViewCampaign/DateSection";
import TalkingPointSection from "../../../../components/Campaign/ViewCampaign/TalkingPointSection";
import QuestionnaireSection from "../../../../components/Campaign/ViewCampaign/QuestionnaireSection";
import VisitDurationSection from "../../../../components/Campaign/ViewCampaign/VisitDurationSection";
import TasksSection from "../../../../components/Campaign/ViewCampaign/TasksSection";

import QuestionnaireList from "../../../../components/Campaign/ViewCampaign/QuestionnaireList";

import Modal from "../../../../components/UI/Modal/Modal";
import {withRouter} from 'react-router-dom'

class ViewCampaign extends Component {
  state = {
    ...this.props,
    show: false
  };

  openModalHandelr = () => {
    this.setState({ show: true });
  };

  modalCloseHandler = () => {
    this.setState({ show: false });
  };

  render() {
    console.log('[Veiw Campaign]', this.props)
    let campaign = this.props.campaign[parseInt(this.props.match.params.index)];
  	
    return (
      <div className={[classes.ViewCampaign].join(" ")}>
        <Modal show={this.state.show} modalClosed={this.modalCloseHandler}>
          <QuestionnaireList questionnaire={campaign.questionnaire} />
        </Modal>
        <PageHead title="View Campaign" subtitle={campaign.title} />

        <div className={[classes.Components, "container"].join(" ")}>
          <div className="row justify-content-center">
            <ManagerSection managers={campaign.managers} />
          </div>
          <div className="row justify-content-center">
            <DateSection
              startDate={campaign.startDate}
              endDate={campaign.endDate}
            />
          </div>
          <div className="row justify-content-center">
            <TalkingPointSection talkingPoint={campaign.talkingPoint} />
          </div>
          <div className="row justify-content-center">
            <QuestionnaireSection
              showModal={this.state.show}
              clickedHandler={this.openModalHandelr}
            />
          </div>
          <div className="row justify-content-center">
            <VisitDurationSection duration={campaign.visitDuration} />
          </div>
          <div className="row justify-content-center">
            <TasksSection tasks={campaign.task} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ViewCampaign);
