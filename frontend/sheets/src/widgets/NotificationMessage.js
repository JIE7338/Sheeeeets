
import React, { Component } from 'react';


const NotificationMessage = class extends Component {

    render() {
        return <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="notification is-success has-text-centered has-text-weight-semibold">
                    <strong>{this.props.message}</strong>
                </div>
            </div>
        </div>
    }

}

export default NotificationMessage;
