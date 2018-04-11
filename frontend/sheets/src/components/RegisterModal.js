import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleRegister, attemptRegister, submitRegistrationInfo } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        registerIsToggled: state.login.registerIsToggled,
        registerError: state.register.error,
        registerSuccessful: state.register.wasSuccessful,
        username: state.register.username,
        password: state.register.password,
        firstName: state.register.firstName,
        lastName: state.register.lastName,
        email: state.register.email
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleRegister: (val) => {
            dispatch(toggleRegister(val));
        },
        attemptRegister: ({username, password, firstName, lastName, email}) => {
            dispatch(attemptRegister({username, password, firstName, lastName, email}));
        },
        submitRegistrationInfo: (key, value) => {
            dispatch(submitRegistrationInfo(key, value));
        },
    }
}


const _RegisterModal = class extends Component {
    constructor(...args) {
        super(...args);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    handleInputChange(event) {
        this.props.submitRegistrationInfo(event.target.name, event.target.value);
    }
    submitUser() {
        this.props.attemptRegister({
            username: this.props.username,
            password: this.props.password,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
        });
    }


    render() {
        const activeClass = (this.props.isActive) ? 'modal is-active' : 'modal';
        const errorMessage = (this.props.registerError && !this.props.registerSuccessful) ?
            <div className='has-text-danger is-size-7 has-text-weight-bold'>
                {this.props.registerError}
            </div>
            : null;
        return <div className={activeClass}>
            <div className='modal-background' onClick={this.props.toggleRegister}>
            </div>

            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>Register New User</p>
                </header>

                <section className='modal-card-body'>
                    <form>
                        <div className='columns'>
                            <div className='field column'>
                                <label className='label'>First Name</label>
                                <div className='control'>
                                    <input className='input'
                                        name='firstName'
                                        type='textbox'
                                        value={this.props.firstName}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div className='field column'>
                                <label className='label'>Last Name</label>
                                <div className='control'>
                                    <input className='input'
                                        name='lastName'
                                        type='textbox'
                                        value={this.props.lastName}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Email</label>
                            <div className='control'>
                                <input className='input'
                                    name='email'
                                    type='textbox'
                                    value={this.props.email}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div className='field'>
                            <label className='label'>Username</label>
                            <div className='control'>
                                <input className='input'
                                    name='username'
                                    type='textbox'
                                    value={this.props.username}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div className='field'>
                            <label className='label'>Password</label>
                            <div className='control'>
                                <input className='input'
                                    name='password'
                                    type='password'
                                    value={this.props.password}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </form>
                </section>

                <footer className='modal-card-foot'>
                    <button onClick={this.submitUser} className='button is-primary'>Register</button>
                    <button onClick={this.props.toggleRegister} className='button'>Cancel</button>
                    {errorMessage}
                </footer>
            </div>
            <button onClick={this.props.toggleRegister} className='modal-close is-large' aria-label='close'></button>
        </div>;
    }
}
const RegisterModal = connect(mapStateToProps, mapDispatchToProps)(_RegisterModal)

export default RegisterModal;

