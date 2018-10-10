import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './containers/SignIn/SignIn';

class App extends Component {
  state = {
  	authenticated : false,
  	userID : null,
  	passwords : null,
  	role : null
  }

  signInHandler=()=>{
  	this.setState(
  		{authenticated:true,
  		 userID : null, 
  		 passwords : null,
  		 role : null}
	);
  }

  signOutHandler=()=>{
  	this.setState({
  		 authenticated:false,
  		 userID : null, 
  		 passwords : null,
  		 role : null});
  }



  render() {
  	let page = <SignIn />

  	if(this.state.authenticated){
  		if(this.state.role === 'manager'){
  			page = <Layout> </Layout> 
  		} else{
  			//Canvasser
  			//System Admin
  		}
  	}
    return (
      <div>
      	{page}
      </div>
    );
  }
}

export default App;
