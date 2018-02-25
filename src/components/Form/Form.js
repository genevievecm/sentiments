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
        };
        this.updateSentiment = this.updateSentiment.bind(this);
    }

    submitForm(e){
        e.preventDefault();

        // Analyze our user input with sentiment.js
        // and pass data to Stage (parent) component
        this.props.score(Sentiment(this.state.sentiment))
    }

    updateSentiment(e){
        // Every time the user types into the input box, this Form component's "sentiment" state is updated.
        const value = e.target.value;
        this.setState({ sentiment: value });
    }

    render() {
        return (
            <div>
                <input value={this.state.sentiment} onChange={this.updateSentiment} type="text"/>
                <button onClick={this.submitForm.bind(this)}>Submit</button>
            </div>
        );
    }
}