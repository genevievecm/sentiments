import React, { Component } from 'react';
import './Form.css';
import Sentiment from 'sentiment';

export default class Form extends Component {

    constructor(props) {
        super(props);

        // Tracking the current state of the input box,
        // which we're calling a sentiment!
        this.state = {
            sentiment: '',
            values: []
        };
    }

    submitForm(e){
        e.preventDefault();

        // Analyze our user input with sentiment.js
        this.setState({
            values: Sentiment(this.state.sentiment)
        });
    }

    updateSentiment(e){
        // Every time the user types into the input box, this Form component's "sentiment" state is updated.
        this.setState({ sentiment: e.target.value });
    }

    render() {
        return (
            <div>
                <input value={this.state.sentiment} onChange={e => this.updateSentiment(e)} type="text"/>
                <button onClick={this.submitForm.bind(this)}>Submit</button>
                {/* Displaying this for now to make sure my state is working alright*/}
                <p>Current sentiment: {this.state.sentiment}</p>

                {/* Displaying these scores for now so we can see the cool datas */}
                <p>Comparative: {this.state.values.comparative}</p>
                <p>Score: {this.state.values.score}</p>

                <p>Positive Words:
                { this.state.values.positive ?
                    <ul>
                    {
                        this.state.values.positive.map((word) => {
                            return <li key={word}>{word}</li>;
                        })
                    }
                    </ul>

                : null }
                </p>
                <p>Negative Words:

                { this.state.values.negative ?
                    <ul>
                    {
                        this.state.values.negative.map((word) => {
                            return <li key={word}>{word}</li>;
                        })
                    }
                    </ul>
                : null }
                </p>
            </div>
        );
    }
}
