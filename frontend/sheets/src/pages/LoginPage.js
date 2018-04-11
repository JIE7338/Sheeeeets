import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoginControl from '../components/LoginControl.js'
import RegisterModal from '../components/RegisterModal.js'


const mapStateToProps = (state, ownProps) => {
    return {
    	registerIsToggled: state.login.registerIsToggled,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
	}
}

const _LoginPage = class extends Component {


	constructor(...args) {
	    super(...args);
	    this.state = {
	        modalIsActive: false
	    };

	}
	gogo() {
        this.props.showMessageModal('Login successful');
    }

	render() {
	    return <div className="section hero-bg">
	    			
	    			<div className="container">
	    				<div className="container title is-1 has-text-centered"> Sheets</div>
	    				<LoginControl method={this.props.method}/>
	    			</div>
	    			<RegisterModal isActive={this.props.registerIsToggled}/>
	    		</div>;
    }

}
const LoginPage = connect(mapStateToProps, mapDispatchToProps)(_LoginPage)

export default LoginPage;
