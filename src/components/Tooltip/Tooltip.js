import React, { Component } from 'react';
import './Tooltip.css';

export default class Tooltip extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="tooltip hide">
              {this.props.message}
            </div>
        );
    }
}
