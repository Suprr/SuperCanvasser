import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import "./ViewTaskCSS.css";
import Modal from "./QModal";
import QuestionnaireList from "../../../components/Campaign/ViewCampaign/QuestionnaireList";

class Task extends Component {
  state = {
    navigate: false,
    show: false
  };

  handleQuestionaire = event => {
    if (!this.props.task.visited) {
      this.setState({ show: true });
    }
  };

  modalCloseHandler = () => {
    this.setState({ show: false });
  };

  modalAcceptHandler = () => {
    this.setState({ show: false });
    this.props.submit;
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
      let color = this.props.task.visited ? "visLoc" : "recLoc";
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
          <Modal
            show={this.state.show}
            modalClosed={this.modalCloseHandler}
            modalAccept={this.modalAcceptHandler}
          >
            <QuestionnaireList questionnaire={this.state.questions} />
          </Modal>
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
