import React, { Component } from 'react';
import './App.css';

import UserList from './components/UserList.js';
import CreateUser from './components/CreateUser.js';

class App extends Component {

  	constructor(props) {
  		super(props);
    }

    render() {
      var attributes = ['account', 'firstName'];
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <UserList />
          </div>
          <div className="createUser">
            <CreateUser attributes= {attributes} />
          </div>
        </div>
      );
    }
}

export default App;
