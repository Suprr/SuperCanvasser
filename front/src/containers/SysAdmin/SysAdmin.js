import React, { Component } from "react";
import EditGV from "./EditGlobalVar/EditGlobalVar";
import ManageUsers from "./ManageUsers/ManageUsers";
import {Route, Redirect, withRouter, Switch} from 'react-router-dom'

class SysAdmin extends Component {
  state = {};
  render() {
    //<Route path={this.props.match.url+'/manage-user'} component = {ManageUsers}/>
    //<Route path={this.props.match.url+'/global-variable'} component={EditGV}/>
    
    return (
      <div>
      	<Switch>
	        <Route path={this.props.match.url+'/view'} component = {ManageUsers}/>
	        <Route path={this.props.match.url+'/var/view'} component={EditGV}/>
	        <Redirect from={this.props.match.url} to = {this.props.match.url+'/view'}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(SysAdmin);
