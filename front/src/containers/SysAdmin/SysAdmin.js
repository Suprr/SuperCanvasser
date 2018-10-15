import React, { Component } from "react";
import EditGV from "./EditGlobalVar/EditGlobalVar";
import ManageUsers from "./ManageUsers/ManageUsers";
import {Route, Redirect, withRouter, Switch} from 'react-router-dom'

class SysAdmin extends Component {
  state = {};
  render() {
    return (
      <div>
      	<Switch>
	        <Route path={this.props.match.url+'/manage-user'} component = {ManageUsers}/>
	        <Route path={this.props.match.url+'/global-variable'} component={EditGV}/>
	        <Redirect from={this.props.match.url} to = {this.props.match.url+'/manage-user'}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(SysAdmin);
