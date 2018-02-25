import React, { Component } from 'react';
import './App.css';
import Form from  '../Form/Form';
import Stage from '../Stage/Stage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          score: {},
          size: 25
        }

        this.handleSentiment = this.handleSentiment.bind(this);
    }

    handleSentiment(data) {
      this.setState({
        score: data,
        size: this.state.size + (data.score * 10)
      });
    }

    render() {
      return (
        <div className="App">
          <Stage size={this.state.size}/>
          <Form score={this.handleSentiment} />

          {/* Displaying this for now to make sure my state is working alright*/}
          <p>Current sentiment: {this.state.sentiment}</p>

          {/* Displaying these scores for now so we can see the cool datas */}
          <p>Comparative: {this.state.score.comparative}</p>
          <p>Score: {this.state.score.score}</p>

          <div>
            <p>Positive Words:</p>
            { this.state.score.positive ?
                <ul>
                {
                    this.state.score.positive.map((word) => {
                        return <li key={word}>{word}</li>;
                    })
                }
                </ul>

            : null }
            </div>
          <div>
            <p>Negative Words:</p>
            { this.state.score.negative ?
                <ul>
                {
                    this.state.score.negative.map((word) => {
                        return <li key={word}>{word}</li>;
                    })
                }
                </ul>
            : null }
          </div>
        </div>
      );
    }
}

export default App;
