import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createNewSheet, changeNewSheetName} from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        username: state.session.username,
        creationError: state.newSheet.error,
        sheetName: state.newSheet.name,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewSheet: (name, username) => {
            dispatch(createNewSheet(name, username));
        },
        changeNewSheetName: (name) => {
            dispatch(changeNewSheetName(name));
        },

    }
}

const _NewSheetInput = class extends Component {
    constructor(props) {
        super(props);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleCreateClick(event) {
        this.props.createNewSheet(this.props.sheetName, this.props.username);
    }
    handleInputChange(event) {
        this.props.changeNewSheetName(event.target.value);
    }


    render() {
        const failedText = (this.props.creationError) ?
            <div className='has-text-danger is-size-4 has-text-weight-bold'>
                {this.props.loginError}
            </div>
            : null;
        return (
            <div>
                <span>
                    <label>New Sheet name:</label>
                    <input type='textbox' value={this.props.sheetName} onChange={this.handleInputChange}/>
                    <button onClick={this.handleCreateClick}>Submit</button>
                </span>
                {failedText}
            </div>
        );
    }
}

const NewSheetInput = connect(mapStateToProps, mapDispatchToProps)(_NewSheetInput)


export default NewSheetInput;
