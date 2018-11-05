import React, { Component } from "react";
import EditAvailability from "./EditAvailability/EditAvailability";
import UpcomingTask from "./UpcomingTask";
import ViewTask from "./ViewTask/ViewTask";
import Questionnaire from "./ViewTask/Questionnaire";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
class Canvasser extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path={this.props.match.url + "/edit-availability"}
            component={EditAvailability}
          />
          <Route
            path={this.props.match.url + "/upcoming-task"}
            component={UpcomingTask}
          />
          <Route
            path={this.props.match.url + "/view-task"}
            component={ViewTask}
          />
          <Route
            path={this.props.match.url + "/view-task/questionnaire"}
            component={Questionnaire}
          />
          <Redirect
            from={this.props.match.url}
            to={this.props.match.url + "/edit-availability"}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Canvasser);
