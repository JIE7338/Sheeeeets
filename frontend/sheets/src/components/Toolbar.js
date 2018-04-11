import React, { Component } from 'react';
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import ToolbarButton from "../widgets/ToolbarButton.js"
import { requestLogout } from '../states/actions'
import {  } from '../states/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.session.username
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(requestLogout());
        }
    }
}

const _Toolbar = withRouter(class extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            path: '/leagues',
        };
    }

    render() {
        const paths =  [
            {path:"/",name:"Dashboard"},
            {path:"/manage",name:"Account"},
            {path:"upload",name:"Upload Profile Picture"}
        ];
        return <div>
                <div className="hero is-primary">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <div className="title">Sheets</div>
                            </div>
                            <div className="column">
                                <div className="subtitle is-pulled-right">
                                    Welcome back, {this.props.currentUser}!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className=" navbar has-shadow tabs is-centered">
                    <div className="container">
                        <ul>
                            {paths.map(({path,name},i) => {
                                return <ToolbarButton key={i} path={path}>{name}</ToolbarButton>
                            })}
                            <div>
                                <a className="navbar-item is-tab" onClick={this.props.logout}>Logout </a>
                            </div>
                        </ul>
                    </div>
                </nav>
            </div>
    }
});
const Toolbar = connect(mapStateToProps, mapDispatchToProps)(_Toolbar)

export default Toolbar;
