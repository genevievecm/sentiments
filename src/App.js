import React, { Component } from 'react';
import './App.css';
import Form from  './Form';
import Stage from './Stage';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Sentiments</h1>
          </header>
          <Stage/>
          <Form/>
        </div>
      );
    }
}

export default App;
