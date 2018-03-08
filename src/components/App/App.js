import React, { Component } from 'react';
import './App.css';
import Stage from '../Stage/Stage';
import Form from  '../Form/Form';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalScore: 0,
            score: {},
            size: 1
        }

        this.handleSentiment = this.handleSentiment.bind(this);
    }

    handleSentiment(data) {
        this.setState({
            totalScore: this.state.totalScore + data.score,
            score: data,
            size: this.state.size + (data.score / 10)
        });
    }

    render() {
        console.log('total score : ' + this.state.totalScore);
        return (
            <div className="App">
              <header className="header flex justify-center self-center">
                <h1>Sentiments</h1>
              </header>
              <section>
                <Stage
                    size={this.state.size}
                    totalScore={this.state.totalScore}
                />
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
