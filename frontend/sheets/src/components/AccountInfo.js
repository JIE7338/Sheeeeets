import React, { Component } from 'react';
import { connect } from 'react-redux'


const mapStateToProps = (state, ownProps) => {
    return {
        username: state.session.username,
        email: state.session.email,
        firstName: state.session.firstName,
        lastName: state.session.lastName
    }
}


const _AccountInfo = class extends Component {


    render() {
        return (
            <div>
                <h1>Name: {this.props.firstName} {this.props.lastName}</h1>
                <br/>
                <h1>Username: {this.props.username}</h1>
                <br/>
                <h1>Email: {this.props.email}</h1>
            </div>
        );
    }
}
const AccountInfo = connect(mapStateToProps)(_AccountInfo)


export default AccountInfo;
