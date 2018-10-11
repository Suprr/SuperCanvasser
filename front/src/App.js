import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Base from './containers/Base/Base'
import SignIn from './containers/SignIn/SignIn';
import Manager from './containers/Manager/Manager';

class App extends Component {
  state = {
  	user : {
  		authenticated : false,
  		userID : null,
  		passwords : null,
  		role : null
  	}
  }

  signInHandler=()=>{
  	this.user.setState(
  		{authenticated:true,
  		 userID : null, 
  		 passwords : null,
  		 role : null}
	);
  }

  signOutHandler=()=>{
  	this.user.setState(
  		 {authenticated:false,
  		 userID : null, 
  		 passwords : null,
  		 role : null});
  }



  render() {
  	//let page = <Route path="/sign-in" exact component={SignIn} />
	//let page = <SignIn user = {this.state.user} />
  	let page = <Layout><Manager /></Layout>
  	if(this.state.authenticated){
  		if(this.state.user.role === 'manager'){
  			page = <Layout> </Layout> 
  		} else{
  			//Canvasser
  			//System Admin
  		}
  		page = <Base path = {'/'+this.state.user.role} user = {this.state.user} exact component={Base}/>
  	}

    return (
      <BrowserRouter>
	      <div>
	      	{page}
	      </div>
      </BrowserRouter>
    );
  }
}

export default App;
