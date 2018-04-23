import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bulma/css/bulma.css';
import 'bulma/bulma.sass';
import 'bulma/mystyles.scss';
import 'react-datasheet/lib/react-datasheet.css';
import { connect } from 'react-redux'

import Toolbar from './components/Toolbar.js';
import LoginPage from './pages/LoginPage.js';
import Dashboard from './pages/Dashboard.js';
import NotFound from './pages/NotFound.js';
import AccountManage from './pages/AccountManage.js';
import SheetPage from './pages/SheetPage.js';
import NotificationMessage from './widgets/NotificationMessage.js';

import {  } from './states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isLoggedIn,
        messageModalContent: state.messageModal.message,
        shouldModalContent: state.messageModal.show,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}


const RedirectHome = class extends Component {
    render() {
        return <Redirect to='/'  />;
    }
}
const RedirectLogin = class extends Component {
    render() {
        return  <Redirect to='/login'/>
    }
}

class _App extends Component {
    constructor(...args) {
        super(...args);
        this.handelLogin = this.handelLogin.bind(this);
        this.state = {
            id: "",
            name: "",
            requestFailed : false,
            loggedIn : false
        };
    }

    componentDidMount() {
    }

    handelLogin(info) {
        this.setState(
            {   loggedIn : info.login,
                id       : info.id,
                name     : info.name}
        )
    }
    handelLogout = () => {
        this.setState(
            {loggedIn : false,
             id       : null}
        )
    }

    render() {
        let elements;
        const messageModal = (this.props.shouldModalContent) ? <NotificationMessage message={this.props.messageModalContent}/> : null

        if (this.props.isLoggedIn) {
            elements = (
                <div>
                    <Toolbar/>
                    <Switch>
                        <Route exact path="/" render={(props) => (
                            <Dashboard/>)} />
                        <Route path="/login" component={RedirectHome}/>
                        <Route path="/manage" component={AccountManage}/>
                        <Route path="/sheet/:sheetname" component={SheetPage}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            );
        } else {
            elements =
                <div className="hero-img is-primary is-fullheight">
                    <Switch>
                        <Route exact path="/login" render={(props) => (
                            <LoginPage {...props}/>)} />
                        <Route component={RedirectLogin}/>
                    </Switch>;
                </div>
        }
        return (
            <BrowserRouter>
                <div className="App">
                    {messageModal}
                    {elements}
                </div>
            </BrowserRouter>
        );

    }
}
const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App;


