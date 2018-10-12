import React, { Component } from "react";

import Sidebar from "../../components/Navigation/Sidebar";
import CampaignList from "./CampaignList/CampaignList";

import classes from "./Manager.module.css";
import CampaignModel from "./CampaignList/CampaignModel";
import ViewCampaign from "./CampaignList/ViewCampaign/ViewCampaign";
import CreateCampaign from "./CreateCampaign/CreateCampaign";

class Manager extends Component {
  state = {
    campaigns: CampaignModel.campaigns,
    manager: this.props.manager
  };

  render() {
    //<CampaignList campaigns = {this.state.campaigns}/>
    //<ViewCampaign campaign = {this.state.campaigns[0]}/>

    console.log("[Manager]", this.state.campaigns);
    return (
      <div className={["col-10", "fixed-center", classes.Manager].join(" ")}>
        <CreateCampaign />
      </div>
    );
  }
}

export default Manager;
