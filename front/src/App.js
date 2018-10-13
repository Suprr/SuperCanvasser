import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Base from "./containers/Base/Base";
import SignIn from "./containers/SignIn/SignIn";

import Manager from "./containers/Manager/Manager";
import Canvasser from "./containers/Canvasser/Canvasser";
import SysAdmin from "./containers/SysAdmin/SysAdmin";
import ManagerData from './containers/Manager/ManagerData'

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
    //let page = <Route path="/sign-in" exact component={SignIn} />
    //let page = <SignIn user = {this.state.user} />
    let page = null;
    if(this.state.user.authenticated){
      page = <Redirect to='/'/>;
    } else{
      page = <Redirect to='/login'/>;
    }
    // console.log("[Render]", this.state.user.role);
    // if (this.state.user.authenticated) {
    //   if (this.state.user.role === "Manager") {
    //     console.log("here");
    //     page = (
    //       <Layout user={this.state.user}>
    //         <Manager manager={this.state.user} />
    //       </Layout>
    //     );
    //   } else if (this.state.user.role === "Canvasser") {
    //     page = (
    //       <Layout user={this.state.user}>
    //         <Canvasser />
    //       </Layout>
    //     );
    //   } else {
    //     page = (
    //       <Layout user={this.state.user}>
    //         <SysAdmin />
    //       </Layout>
    //     );
    //   }

    //   //	page = <Base path = {'/'+this.state.user.role} user = {this.state.user} exact component={Base}/>
    // } else {
    //   page = <SignIn user={this.state.user} signedIn={this.signInHandler} />;
    // }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path='/:role/:id' component={Base} />
          {page}
        </Switch>
        
      </BrowserRouter>
    );
  }
}

export default App;
