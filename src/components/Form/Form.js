import React, { Component } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import Sentiment from 'sentiment';
import './Form.css';

export default class Form extends Component {

    constructor(props) {
        super(props);

        // Tracking the current state of the input box,
        // which we're calling a sentiment!
        this.state = {
            sentiment: '',
            totalSentiments: [],
            tooltip: true,
        };
        this.updateSentiment = this.updateSentiment.bind(this);
    }

    submitForm(e){
        e.preventDefault();

        // Reset form after submit: Commenting this out for testing
        // this.setState({ sentiment: '' });

        // Compile an array of all sentiments
        // if form is submitted, tooltip is no longer needed
        this.setState({
            totalSentiments: [...this.state.totalSentiments, this.state.sentiment ],
            tooltip: false
        });
        // Analyze our user input with sentiment.js
        // and pass data to Stage (parent) component
        this.props.score(Sentiment(this.state.sentiment));
    }

    updateSentiment(e){
        // Every time the user types into the input box, this Form component's "sentiment" state is updated.
        const value = e.target.value;
        this.setState({ sentiment: value });
    }

    render() {
        return (
            <div>
                <form className="form">
                    <div className="tooltip-wrapper">
                        <Tooltip
                            display={this.state.tooltip}
                            message={'Say something nice about yourself...'}
                        />
                        <input
                            autoFocus
                            className="form-input"
                            value={this.state.sentiment}
                            onChange={this.updateSentiment}
                            type="text"
                        />
                    </div>
                    <button
                        className="button"
                        onClick={this.submitForm.bind(this)}
                        disabled={!this.state.sentiment}>
                        Submit
                    </button>
                </form>
                { this.state.totalSentiments.length ?
                    <div className="flex justify-center self-center">{this.state.totalSentiments.length} total { this.state.totalSentiments.length === 1 ? 'sentiment' : 'sentiments' }</div>
                : null }


               {/* <div className="flex justify-center self-center sentiment-list">
                    {
                       this.state.totalSentiments.map((sentiment, i) => {
                           return <p key={i}>{sentiment}</p>;
                       })
                    }
                </div>*/}
            </div>
        );
    }
}
