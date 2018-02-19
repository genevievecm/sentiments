import React, { Component } from 'react';
import './App.css';
import Form from  './Form';
import Stage from './Stage';

class App extends Component {
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
