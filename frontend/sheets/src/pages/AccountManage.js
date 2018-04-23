import React, { Component } from 'react';
import { connect } from 'react-redux'
import AccountInfo from '../components/AccountInfo.js'
import SingleInputModal from '../widgets/SingleInputModal.js'

import { toggleChangeEmailModal, toggleChangePasswordModal, attemptChangeEmail,
    attemptChangePassword, changeValueNewEmail, changeValueNewPassword } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
    	emailIsToggled: state.accountManager.changeEmailModalIsToggled,
    	passwordIsToggled: state.accountManager.changePasswordModalIsToggled,
        username: state.session.username,
        email: state.accountManager.newEmail,
        password: state.accountManager.newPassword,
        error: state.accountManager.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        attemptChangePassword: (username, password) => {
            dispatch(attemptChangePassword({username, password}));
        },
        attemptChangeEmail: (username, email, password) => {
            dispatch(attemptChangeEmail({username, email, password}));
        },
        toggleChangePasswordModal: () => {
            dispatch(toggleChangePasswordModal());
        },
        toggleChangeEmailModal: () => {
            dispatch(toggleChangeEmailModal());
        },
        changeValueNewPassword: (value) => {
            dispatch(changeValueNewPassword(value));
        },
        changeValueNewEmail: (value) => {
            dispatch(changeValueNewEmail(value));
        }
    }
}


const _AccountManage = class extends Component {


	constructor(...args) {
	    super(...args);
	    this.state = {
	        modalIsActive: false
	    };
        this.handleTogglePassword = this.handleTogglePassword.bind(this);
        this.handleToggleEmail = this.handleToggleEmail.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    }
    handleTogglePassword(event) {
        this.props.toggleChangePasswordModal();
    }
    handleToggleEmail(event) {
        this.props.toggleChangeEmailModal();
    }
    handleSubmitEmail() {
        this.props.attemptChangeEmail(this.props.username, this.props.email, this.props.password);
    }
    handleSubmitPassword() {
        this.props.attemptChangePassword(this.props.username, this.props.password);
    }

	render() {
	    return <div className="section hero-bg">
	    			<div className="container title is-1 has-text-centered"> Account Info</div>
	    			<div className="container">
                        <AccountInfo/>
	    			</div>
                    <div className='field is-grouped is-grouped-centered'>
                        <p className='control'>
                            <button onClick={this.handleToggleEmail} className='button is-primary is-inverted'>Change Email</button>
                        </p>
                        <p className='control'>
                            <button onClick={this.handleTogglePassword} className='button is-primary is-inverted'>Change Password</button>
                        </p>
                    </div>
	    			<SingleInputModal
                        isActive={this.props.passwordIsToggled}
                        title='Change Password'
                        label='New Password'
                        hideModal={this.props.toggleChangePasswordModal}
                        changeInput={this.props.changeValueNewPassword}
                        submitModal={this.handleSubmitPassword}
                        error={this.props.error}
                    />
	    			<SingleInputModal
                        isActive={this.props.emailIsToggled}
                        title='Change Email'
                        label='New Email'
                        hideModal={this.props.toggleChangeEmailModal}
                        changeInput={this.props.changeValueNewEmail}
                        submitModal={this.handleSubmitEmail}
                        error={this.props.error}
                    />

	    		</div>;
    }

}
const AccountManage = connect(mapStateToProps, mapDispatchToProps)(_AccountManage)

export default AccountManage;
