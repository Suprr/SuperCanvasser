import React, { Component } from "react";
import "./ViewTaskCSS.css";
import Question from "./Question";

class Questionnaire extends Component {
  state = {
    questions: [
      { id: 1, question: "question 1" },
      { id: 2, question: "what is fav color?" }
    ],
    location: "223-159 Hooper St. Brooklyn, NY 11211"
  };
  sendData = event => {};

  render() {
    return (
      <div>
        <h1>View Task > Questionnaire</h1>
        <h2>Nov 11, 2018</h2>
        <h2>Task1</h2>
        <div className="nest">
          <div className="row">
            <div className="col-sm">
              <h4> Location </h4>
            </div>
            <div className="col-sm">
              <h4> {this.state.location}</h4>
            </div>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              No Answer
            </label>
          </div>
          <div className="row">
            <h4>Name</h4>
            <div className="col-sm">
              <input
                onChange={this.handleVarChange}
                className="border-top-0 border-right-0 border-left-0"
                type="text"
              />
            </div>
            <div className="form-check col-sm">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label class="form-check-label" for="defaultCheck2">
                Anonymous
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <h4>Questions</h4>
          </div>
          <div className="col-sm">
            <h4>Answers</h4>
          </div>
        </div>
        {this.state.questions.map(question => (
          <Question key={question.id} question={question} />
        ))}
        <button
          onClick={event => {
            this.sendData(event);
          }}
          className="btn"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Questionnaire;
