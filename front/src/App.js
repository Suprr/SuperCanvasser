import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './containers/SignIn/SignIn';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SignIn />
        </Layout>
      </div>
    );
  }
}

export default App;
