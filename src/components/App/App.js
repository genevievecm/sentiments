import React, { Component } from 'react';
import './App.css';
import Form from  '../Form/Form';
import Stage from '../Stage/Stage';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="App">
          <Stage/>
        </div>
      );
    }
}

export default App;
