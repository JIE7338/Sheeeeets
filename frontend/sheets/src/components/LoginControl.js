import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleRegister, attemptLogin, submitLoginInfo } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        string: state.session.id,
        loginError: state.session.error,
        username: state.login.username,
        password: state.login.password,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        attemptLogin: (username, password) => {
            dispatch(attemptLogin(username, password));
        },
        toggleRegister: (val) => {
            dispatch(toggleRegister(val));
        },
        submitLoginInfo: (key, value) => {
            dispatch(submitLoginInfo(key, value));
        }
    }
}

const _LoginControl = class extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleToggleRegister = this.handleToggleRegister.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLoginClick(event) {
        this.props.attemptLogin(this.props.username, this.props.password);
    }

    handleToggleRegister(event) {
        this.props.toggleRegister();
    }

    handleInputChange(event) {
        this.props.submitLoginInfo([event.target.name], event.target.value);
    }

    render() {
        const failedText = (this.props.loginError) ?
            <div className='has-text-danger is-size-4 has-text-weight-bold'>
                {this.props.loginError}
            </div>
            : null;
        return (
            <div>
                <h1 className='title has-text-centered'>Please sign in.</h1>
                
                <div className="columns">
                            <div className="column"> </div>
                            <div className="column is-two-thirds">
                                
                            
                <form>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input className="input"
                                name="username"
                                type="textbox"
                                value={this.props.user}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input"
                                name="password"
                                type="password"
                                value={this.props.password}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                </form>
                <br/>
                <div className='field is-grouped is-grouped-centered'>
                    <p className='control'>
                        <button onClick={this.handleLoginClick} className='button is-primary is-inverted'>Login</button>
                    </p>
                    <p className='control'>
                        <button onClick={this.handleToggleRegister} className='button is-primary is-inverted'>Register</button>
                    </p>
                </div>
                {failedText}
                </div>
                <div className="column"> </div>
                </div>
            </div>
        );
    }
}

const LoginControl = connect(mapStateToProps, mapDispatchToProps)(_LoginControl)


export default LoginControl;
