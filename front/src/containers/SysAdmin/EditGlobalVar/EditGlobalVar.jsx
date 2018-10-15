import React, { Component } from "react";
import Variable from "./Variable";
import axios from '../../../axios'
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
    ],

    variablesFromServer : []
  };
  
  handleEdit = (newValue, id) => {
    const tempVariables = { ...this.state.variables };
    for (let i = 0; i < this.state.variables.length; i++) {
      if (this.state.variables[i].id === id) {
        tempVariables[i].value = newValue;
        break;
      }
    }

    this.setState({ variables: tempVariables });
  };

  componentDidMount(){
    console.log('componentDidMount EditGlobalVar')

    let x = null
      axios.get('https://cse308-de3df.firebaseio.com/global-variable.json').then(response=>{
        x= response.data
        

        if(x!=null){
          console.log(x)
          let newVariables = []
          for(let i in response.data){
            newVariables.push(x[i]);

          }
          console.log('variablesFromServer', newVariables);
          this.setState({variablesFromServer : newVariables})
        }
      });
  }

  
  render() {
    return (
      <div>
        <h1>Global Variables</h1>
        <div className="var-list">
          <div className="row nest">
            <div className="col-sm">
              <h4>Variable Names</h4>
            </div>
            <div className="col-sm">
              <h4>Values</h4>
            </div>
            <div className="col-sm" />
          </div>
        </div>
        {this.state.variablesFromServer.map(variable => (
          <Variable
            key={variable.id}
            variable={variable}
            onEdit={this.handleEdit}
          />
        ))}
      </div>
    );
  }
}

export default EditGlobalVar;
