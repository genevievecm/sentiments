import React, { Component } from 'react';
import './Tooltip.css';

export default class Tooltip extends Component {

    constructor(props){
        super(props);

        this.state = {
            display: 'show'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.display === false) {
            this.setState({ display: 'fade' });

            //hide tooltip after fade out animation is complete
            return setTimeout(() => {
                this.setState({ display: 'hide' });
            }, 700);
        }
    }

    render() {
        return (
            <div className={`tooltip ${this.state.display}`}>
                {this.props.message}
            </div>
        );
    }
}
