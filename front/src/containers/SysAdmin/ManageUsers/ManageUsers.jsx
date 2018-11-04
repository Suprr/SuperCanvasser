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
    const users = this.state.users.filter(c => c.id !== userID);
    this.setState({ users });
  };

  handleAdd = (role, name) => {
    const user = {
      id: this.newUniqueId(this.state.users),
      identity: -1,
      name: ""
    };
    if (role === "Manager") {
      user.identity = 0;
    } else if (role === "Canvasser") {
      user.identity = 1;
    } else if (role === "SysAdmin") {
      user.identity = 2;
    }
    user.name = name;
    this.setState({ users: this.state.users.concat([user]) });
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
    for (let i = 0; i < users.length; i++) {
      if (users[i].id > highestNum) {
        highestNum = users[i].id;
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
          <Users
          managers={this.state.users}
          canvassers = {this.state.canvassers}
          sysAdmins = {this.state.sysAdmins}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default ManageUsers;
