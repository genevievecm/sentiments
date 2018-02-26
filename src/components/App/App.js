import React, { Component } from 'react';
import './App.css';
import Form from  '../Form/Form';
import Stage from '../Stage/Stage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          score: {},
          size: 1
        }

        this.handleSentiment = this.handleSentiment.bind(this);
    }

    handleSentiment(data) {
      this.setState({
        score: data,
        size: this.state.size + (data.score / 10)
      });
    }

    render() {
      console.table(this.state.score);
      console.log("size: " + this.state.size);
      return (
        <div className="App">
          <header className="header flex justify-center self-center">
            <h1>Sentiments</h1>
          </header>
          <section>
            <Stage size={this.state.size}/>
            <Form score={this.handleSentiment} />
          </section>
          <footer className="footer flex justify-center self-center">
              <p>Sentiments &copy; 2018</p>
          </footer>
        </div>
      );
    }
}

export default App;
