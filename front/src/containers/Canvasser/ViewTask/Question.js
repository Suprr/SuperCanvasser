import React, { Component } from "react";
class Question extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="question-row col-sm">
          <h4>{this.props.question.question}</h4>
        </div>
        <div className="col-sm">
          <label class="radio-inline">
            <input type="radio" name={this.props.question.id} checked />
            Yes
          </label>
          <label class="radio-inline">
            <input type="radio" name={this.props.question.id} />
            No
          </label>
        </div>
      </div>
    );
  }
}

export default Question;
