import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import "./ViewTaskCSS.css";

class Task extends Component {
  state = {
    navigate: false
  };

  handleQuestionaire = event => {
    if (this.props.task.type === "Questionnaire") {
      this.setState({ navigate: true });
    }
  };

  render() {
    if (this.state.navigate) {
      return (
        <Redirect
          from={this.props.match.url}
          to={this.props.match.url + "/questionnaire"}
        />
      );
    } else {
      let color = this.props.task.type == "Questionnaire" ? "recLoc" : "visLoc";
      let button = this.props.task.visited ? (
        <button
          onClick={event => {
            this.handleQuestionaire(event);
          }}
          className="btn"
        >
          Visited
        </button>
      ) : (
        <button
          onClick={event => {
            this.handleQuestionaire(event);
          }}
          className="btn"
        >
          Questionnaire
        </button>
      );
      return (
        <div className="row task-row">
          <div className="col-sm">
            <div className={color}>{this.props.task.id}</div>
          </div>
          <div className="col-sm">
            <div>
              <span>
                {this.props.task.number + " " + this.props.task.street}
              </span>
            </div>
            <div>
              <span>
                {this.props.task.city + ", " + this.props.task.zipcode}
              </span>
            </div>
          </div>
          <div className="col-sm">{button}</div>
        </div>
      );
    }
  }
}

export default Task;
