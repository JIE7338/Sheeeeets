import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {  } from '../states/actions'

const ToolbarButton = withRouter(class extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            path: this.props.path
        };
    }

    pushNewHistroy = () => {
        if (this.props.history.location.pathname
            !== this.state.path)
        {
            this.props.history.push(
                this.state.path);
        }
    }


    render() {
        var className = "navbar-item is-tab";
        if (this.state.path === this.props.history.location.pathname) className = " navbar-item is-tab is-active";
        return <div>
                <a  className={className} onClick={this.pushNewHistroy}>{this.props.children}</a>
            </div>
    }
});

export default ToolbarButton