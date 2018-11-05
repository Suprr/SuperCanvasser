import React, { Component } from "react";
import Task from "./Task";
class ViewTask extends Component {
  state = {
    nextLoc: {
      id: 3,
      add1: "223-159 Hooper St",
      add2: "Brooklyn, NY 11211",
      type: "Questionnaire"
    },
    locations: [
      {
        id: 4,
        add1: "19 Maujer St",
        add2: "Brooklyn, NY 11211",
        type: "Questionnaire"
      },
      {
        id: 6,
        add1: "196-208 Throop Ave",
        add2: "Brooklyn, NY 11206",
        type: "Questionnaire"
      }
    ],
    visitedLoc: [
      {
        id: 1,
        add1: "Brooklyn",
        add2: "New York 11201",
        type: "View"
      },
      {
        id: 2,
        add1: "I-278",
        add2: "Brooklyn, NY 11205",
        type: "View"
      },
      {
        id: 5,
        add1: "110-138 Boerum St",
        add2: "Brooklyn, NY 11206",
        type: "View"
      }
    ]
  };

  render() {
    return (
      <div>
        <h1>View Task</h1>
        <h2>Nov 11, 2018</h2>
        <h2>Task1</h2>
        <h2>Next Recommended Location</h2>
        <Task key={this.state.nextLoc.id} task={this.state.nextLoc} />
        <h2>Unvisited Location</h2>
        {this.state.locations.map(task => (
          <Task key={task.id} task={task} />
        ))}
        <h2>Visited Location</h2>
        {this.state.visitedLoc.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
  }
}

export default ViewTask;
