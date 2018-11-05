import React, { Component } from "react";
import Task from "./Task";
import axios from '../../../axios'

class ViewTask extends Component {
  state = {
    isMounted: false,
    nextLoc: {
    },
    locations: [],
    visitedLoc: []
  };

  componentDidMount() {
	  const userInfoData= JSON.parse(sessionStorage.getItem('userInfo'));
    const userID = userInfoData._id;
    this.setState({ isMounted: true }, () => {
      let recLoc;
      let locations;
      axios
        .get("/task/activeTask/?_id="+userID)
        .then(response => {
          const data = response.data;
          if (this.state.isMounted) {
            recLoc=data.recommendedLoc;
            locations = data.locations;
          axios
          .post("/task/locations", locations)
           .then(response=> {
             const newData = response.data;
             this.setState({ nextLoc: newData[0], locations: newData});
           })
          }
        })
    });
  }

  componentWillUnMount() {
    this.setState({ isMounted: false });
  }

  render() {
    console.log(this.state.locations, this.state.nextLoc);
    return (
      <div>
        <h1>View Task</h1>
        <h2>Nov 11, 2018</h2>
        <h2>Task1</h2>
        <h2>Next Recommended Location</h2>
        {
        <Task key={this.state.nextLoc._id} task={this.state.nextLoc} />
        }
        <h2>Unvisited Location</h2>
        {this.state.locations.map(task => (
          <Task key={task._id} task={task} />
        ))}
        <h2>Visited Location</h2>
        {this.state.visitedLoc.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    );
  }
}

export default ViewTask;
