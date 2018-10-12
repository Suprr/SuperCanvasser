import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Base from "./containers/Base/Base";
import SignIn from "./containers/SignIn/SignIn";

import Manager from "./containers/Manager/Manager";
import Canvasser from "./containers/Canvasser/Canvasser";
import SysAdmin from "./containers/SysAdmin/SysAdmin";

import Routes from "./routes";
class App extends Component {
  state = {
    user: {
      authenticated: false,
      userID: "Manager1",
      passwords: null,
      role: "manager"
    }
  };

  signInHandler = () => {
    this.user.setState({
      authenticated: true,
      userID: null,
      passwords: null,
      role: null
    });
  };

  signOutHandler = () => {
    this.user.setState({
      authenticated: false,
      userID: null,
      passwords: null,
      role: null
    });
  };

  render() {
    //let page = <Route path="/sign-in" exact component={SignIn} />
    //let page = <SignIn user = {this.state.user} />
    let page = null;
    //if(this.state.authenticated){
    if (this.state.user.role === "manager") {
      page = (
        <Layout user={this.state.user}>
          <Manager manager={this.state.user} />
        </Layout>
      );
    } else if (this.state.user.role === "canvasser") {
      page = (
        <Layout user={this.state.user}>
          <Canvasser />
        </Layout>
      );
    } else {
      page = (
        <Layout user={this.state.user}>
          <SysAdmin />
        </Layout>
      );
    }

    //	page = <Base path = {'/'+this.state.user.role} user = {this.state.user} exact component={Base}/>
    //}

    return <Routes />;
  }
}

export default App;
