import React, { Component } from 'react';
import './App.css';

export default class Form extends Component {

    constructor(props) {
        super(props);

        // Tracking the current state of the input box,
        // which we're calling a sentiment!
        this.state = {
            sentiment: ''
        };
    }

    submitForm(e){
        // One day this will use sentiment.js to analyze the sentiment
        // and maybe add it to an array of all sentiments?
        e.preventDefault();
        alert("Do the thing!");
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
                {/*Displaying this for now to make sure my state is working alright*/}
                <p>Current sentiment: {this.state.sentiment}</p>
            </div>
        );
    }
}
