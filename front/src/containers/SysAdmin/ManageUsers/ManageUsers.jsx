import React, { Component } from "react";
import AddUser from "./AddUser";
import Users from "./Users";
import axios from "../../../axios"
class ManageUsers extends Component {
  state = {
    managers:[],
    canvassers:[],
    sysAdmins :[],
    isMounted : false,
  };

  handleDelete = userID => {
    console.log(userID);
    axios
      .delete("/users/" + userID.id + ".json/", userID)
      .then(response => {
        this.handleUpdateUsers();
        console.log("delete user success");
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  handleAdd = (role, name) => {
    const user = {
      id: this.newUniqueId(this.state.users),
      value: -1,
      name: ""
    };
    if (role === "Manager") {
      user.value = 0;
    } else if (role === "Canvasser") {
      user.value = 1;
    } else if (role === "SysAdmin") {
      user.value = 2;
    }
    user.name = name;
    axios
      .put("/users/" + user.id + ".json/", user)
      .then(response => {
        this.handleUpdateUsers();
        console.log("delete user success");
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  componentDidMount(){
    
    this.setState( { isMounted: true }, () => {
          axios.get('/sysad/view').then(response=>{
           
          const responseData = response.data

          console.log(['ManagerUSer'], responseData);

          let localManager=[];
          let localCanvasser = [];
          let localSysAdmin = []; 

          for(let i =0; i<responseData.length; i++){
            if(responseData[i].role=='MANAGER')
              localManager.push(responseData[i]);
            else if(responseData[i].role=='CANVASSER')
              localCanvasser.push(responseData[i]);
            else
              localSysAdmin.push(responseData[i]);
          }


          if(this.state.isMounted){
            console.log('ViewCampaign', 'UPLOADED');
             this.setState({managers:localManager,
                            canvassers:localCanvasser,
                            sysAdmins:localSysAdmin});
          }

        }).catch(error=>{
          console.log(error)
        })
    });
  }

  componentWillUnMount(){
    this.setState({isMounted:false});
  }

  newUniqueId(users) {
    let highestNum = 0;
    for (let i = 0; i < this.state.variablesFromServer.length; i++) {
      if (this.state.variablesFromServer[i].id > highestNum) {
        highestNum = this.state.variablesFromServer[i].id;
      }
    }
    return ++highestNum;
  }

  handleEdit = () => {};


  render() {

    return (
      <div>
        <h1>Manage Users</h1>
        <div className="spacing" />
        <AddUser onAdd={this.handleAdd} />
        <div className="spacing" />
<<<<<<< HEAD
        <Users
          users={this.state.variablesFromServer}
=======
          <Users
          managers={this.state.users}
          canvassers = {this.state.canvassers}
          sysAdmins = {this.state.sysAdmins}
>>>>>>> master
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onUpdate={this.handleUpdateUsers}
        />
      </div>
    );
  }
}

export default ManageUsers;
