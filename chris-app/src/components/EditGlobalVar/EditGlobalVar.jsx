import React, { Component } from "react";
class EditGlobalVar extends Component {
  state = {
    variables: [
      { id: 1, value: 123, name: "GlobalVariable" },
      { id: 2, value: 8, name: "GlobalVariable2" },
      { id: 3, value: 166, name: "GlobalVariable3" },
      { id: 4, value: 100, name: "GlobalVariable4" },
      { id: 5, value: 72, name: "GlobalVariable5" },
      { id: 6, value: 36, name: "GlobalVariable6" },
      { id: 7, value: 2, name: "GlobalVariable7" },
      { id: 8, value: 123, name: "GlobalVariable8" }
    ]
  };
  render() {
    return <div>
      <h1>Global Variables</h1>
      <div className="var-list">
      <div>
        <h2>Variable Names</h2>
        <h2>Values</h2>
        </div>
        
      </div>
      </div>;
  }
}

export default EditGlobalVar;
