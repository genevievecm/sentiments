import React, { Component } from 'react';
import './App.css';

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sentiment: ''
        };
    }

    submitForm(e){
        e.preventDefault();
        alert("Do the thing!");
    }

    updateSentiment(e){
        this.setState({ sentiment: e.target.value });
    }

    render() {
        return (
          <div>
            <input value={this.state.sentiment} onChange={e => this.updateSentiment(e)} type="text"/>
            <button onClick={this.submitForm.bind(this)}>Submit</button>
          </div>
        );
    }
}
