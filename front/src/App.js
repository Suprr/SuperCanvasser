import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Base from "./containers/Base/Base";
import SignIn from "./containers/SignIn/SignIn";

import Manager from "./containers/Manager/Manager";
import Canvasser from "./containers/Canvasser/Canvasser";
import SysAdmin from "./containers/SysAdmin/SysAdmin";
class App extends Component {
  state = {
    user: {
      authenticated: false,
      userID: "",
      passwords: "",
      role: ""
    }
  };

  signInHandler = () => {
    console.log("called Sign In handelr");

    this.setState({
      user: {
        authenticated: true,
        userID: this.state.user.userID,
        passwords: this.state.user.passwords,
        role: this.state.user.role
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
    //let page = <Route path="/sign-in" exact component={SignIn} />
    //let page = <SignIn user = {this.state.user} />
    let page = null;
    console.log("[Render]", this.state.user.authenticated);
    if (this.state.user.authenticated) {
      if (this.state.user.role === "manager") {
        console.log("here");
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
    } else {
      page = <SignIn user={this.state.user} signedIn={this.signInHandler} />;
    }

    return { page };
  }
}

export default App;
