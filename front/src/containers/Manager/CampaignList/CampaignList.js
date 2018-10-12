import React, { Component } from "react";
import Campaign from "../../../components/Campaign/Campaign";
import PageHead from "../../../components/Layout/PageHead/PageHead";

class CampaignList extends Component {
  state = {
    campaigns: this.props.campaigns
  };

  render() {
    let campaigns = this.state.campaigns.map(cpg => {
      let campaign = null;

      campaign = <Campaign key={cpg.id} campaign={cpg} />;

      return campaign;
    });

    return (
      <div>
        <PageHead title="Campaign List" />

        <div className="row">{campaigns}</div>
      </div>
    );
  }
}

export default CampaignList;
