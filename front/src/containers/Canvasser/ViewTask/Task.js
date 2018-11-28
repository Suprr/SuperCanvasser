import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import "./ViewTaskCSS.css";
import Modal from "./QModal";
import QuestionnaireList from "../../../components/Campaign/ViewCampaign/QuestionnaireList";

class Task extends Component {
  state = {
    mounted: false,
    show: false,
    questions: [],
    modalData: "",
    curTask: this.props.loc
  };

  handleQuestionaire = event => {
    if (!this.state.curTask.visited) {
      this.setState({ show: true });
    }
  };

  modalCloseHandler = () => {
    this.setState({ show: false });
  };

  modalAcceptHandler = () => {
    this.setState({ show: false });
    this.props.submit(this.state.curTask);
  };

  setAnon = e => {
    let tempCurTest = this.state.curTask;
    tempCurTest.anonymous = e;
    this.setState({ curTask: tempCurTest });
  };

  setRating = e => {
    let tempCurTest = this.state.curTask;
    tempCurTest.rating = e;
    this.setState({ curTask: tempCurTest });
  };

  setQuestion = (e, x) => {
    let tempCurTest = this.state.curTask;
    tempCurTest.qNa[e] = x;
    this.setState({ curTask: tempCurTest });
  };

  render() {
    let color = this.state.curTask.visited ? "visLoc" : "recLoc";
    let button = this.state.curTask.visited ? (
      <h4>Visited</h4>
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
    console.log(this.state.curTask);
    let count = 0;
    let child = this.state.curTask.qNa != null ?(
      <div className="container">
        {Object.keys(this.state.curTask.qNa).map(key => (
          <div className="row" key={count++}>
            <div className="col-sm">{key}</div>
            <div className="col-sm">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className="btn btn-secondary active"
                  onClick={() => this.setQuestion(key, false)}
                >
                  <input type="radio" name="options" id="option1" />
                  No
                </label>
                <label
                  className="btn btn-secondary"
                  onClick={() => this.setQuestion(key, true)}
                >
                  <input type="radio" name="options" id="option2" />
                  Yes
                </label>
              </div>
            </div>
          </div>
        ))}
        <div>
          <div className="row">
            <div className="col-sm">
              <label>Rating</label>
            </div>
            <div className="col-sm">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className="btn btn-secondary active"
                  onClick={() => this.setRating(1)}
                >
                  <input type="radio" name="options" id="option1" />1
                </label>
                <label
                  className="btn btn-secondary"
                  onClick={() => this.setRating(2)}
                >
                  <input type="radio" name="options" id="option2" />2
                </label>
                <label
                  className="btn btn-secondary"
                  onClick={() => this.setRating(3)}
                >
                  <input type="radio" name="options" id="option2" />3
                </label>
                <label
                  className="btn btn-secondary"
                  onClick={() => this.setRating(4)}
                >
                  <input type="radio" name="options" id="option2" />4
                </label>
                <label
                  className="btn btn-secondary"
                  onClick={() => this.setRating(5)}
                >
                  <input type="radio" name="options" id="option2" />5
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <label>Anonymous</label>
          </div>
          <div className="col-sm">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className="btn btn-secondary active"
                onClick={() => this.setAnon(false)}
              >
                <input type="radio" name="options" id="option1" />
                No
              </label>
              <label
                className="btn btn-secondary"
                onClick={() => this.setAnon(true)}
              >
                <input type="radio" name="options" id="option2" />
                Yes
              </label>
            </div>
          </div>
        </div>
      </div>
    ):null;
    return (
      <div className="row task-row">
        <Modal
          show={this.state.show}
          modalClosed={this.modalCloseHandler}
          modalAccept={this.modalAcceptHandler}
          children={child}
        />
        <div className="col-sm">
          <div className={color}>{this.state.curTask.id}</div>
        </div>
        <div className="col-sm">
          <div>
            <span>
              {this.state.curTask.number + " " + this.state.curTask.street}
            </span>
          </div>
          <div>
            <span>
              {this.state.curTask.city + ", " + this.state.curTask.zipcode}
            </span>
          </div>
        </div>
        <div className="col-sm">{button}</div>
      </div>
    );
  }
}

export default Task;
