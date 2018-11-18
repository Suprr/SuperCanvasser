import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Base from "./containers/Base/Base";
import SignIn from "./containers/SignIn/SignIn";
import SignInRole from "./containers/SignIn/SignInRole";

import Manager from "./containers/Manager/Manager";
import Canvasser from "./containers/Canvasser/Canvasser";
import SysAdmin from "./containers/SysAdmin/SysAdmin";
import ManagerData from "./containers/Manager/ManagerData";

class App extends Component {
  state = {
    user: {
      authenticated: false,
      userID: "",
      passwords: "",
      role: ""
    }
  };

  signInHandler = loginInfo => {
    console.log("called Sign In handelr", loginInfo);

    this.setState({
      user: {
        authenticated: true,
        userID: loginInfo.userID,
        passwords: loginInfo.passwords,
        role: loginInfo.role
      }
    });
  };

  signOutHandler = () => {
    this.state.user.setState({
      authenticated: false,
      userID: null,
      passwords: null,
      role: null
    });
  };

  render() {
    let page = null;
    if (this.state.user.authenticated) {
      page = <Redirect to="/" />;
    } else {
      page = <Redirect to="/login" />;
    }
    return ( 
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path="/login/role" exact component={SignInRole} />
          <Route path='/:role/' component={Base} />
          {page}
        </Switch>
        
      </BrowserRouter>
      
    );
  }
}

export default App;
