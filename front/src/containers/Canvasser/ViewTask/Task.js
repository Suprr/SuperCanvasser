import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import "./ViewTaskCSS.css";

class Task extends Component {
  state = {
    navigate: false
  };

  handleQuestionaire = event => {
    if (!this.props.task.visited) {
      this.setState({ navigate: true });
    }
  };

  render() {
    const type = this.props.task.visited?"View":"Questionnaire";
    if (this.state.navigate) {
      return (
        <Redirect
          from={this.props.match.url}
          to={this.props.match.url + "/questionnaire"}
        />
      );
    } else {
      return (
        <div className="row task-row">
          <div className="col-sm">
            <span>{this.props.task.id}</span>
          </div>
          <div className="col-sm">
            <div>
              <span>{this.props.task.address}</span>
            </div>
          </div>
          <div className="col-sm">
            <button
              onClick={event => {
                this.handleQuestionaire(event);
              }}
              className="btn"
            >
              {type}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Task;
