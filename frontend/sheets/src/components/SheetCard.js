import React, { Component } from 'react';
import { connect } from 'react-redux'
import { suggestNewSheetName, changeSheetName, setNewSheetName } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        sheetBeingEdited: state.sheets.sheetBeingEdited,
        newSheetName: state.sheets.newSheetName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        suggestNewSheetName: (sheetName) => {
            dispatch(suggestNewSheetName(sheetName));
        },
        changeSheetName: (sheetName) => {
            dispatch(changeSheetName(sheetName));
        },
        setNewSheetName: (sheetName) => {
            dispatch(setNewSheetName(sheetName));
        },
    }
}

const _SheetCard = class extends Component {
    constructor(props) {
        super(...props);
        this.handelEdit = this.handelEdit.bind(this);
        this.handelSave = this.handelSave.bind(this);
        this.handleChangeNewSheetName = this.handleChangeNewSheetName.bind(this);

    }
    handelEdit(event) {
        this.props.suggestNewSheetName(this.props.sheet);
    }
    handelSave(event) {
        this.props.changeSheetName(this.props.sheet);
    }
    handleChangeNewSheetName(event) {
        this.props.setNewSheetName(event.target.value);
    }


    render() {
        console.log(this.props.sheet);
        const labelOrEditInput = (this.props.sheet !== this.props.sheetBeingEdited) ?
            <div class="field is-grouped">
                <p className="control title is-4 is-expanded" style={{color:'black'}}>
                    {this.props.sheet}
                </p>
                <p class="control is-pulled-right">
                    <a class="button is-info" onClick={this.handelEdit}>
                        Edit Name
                    </a>
                </p>
            </div>
            :
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" value={this.props.newSheetName} onChange={this.handleChangeNewSheetName}/>
                </p>
                <p class="control">
                    <a class="button is-info" onClick={this.handelSave}>
                        Save
                    </a>
                </p>
            </div>;
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content ">
                            {labelOrEditInput}
                        </div>
                    </div>
                    <div className="content">
                        <p className="title is-6">Created: 11:09 PM - 1 Jan 2016</p>
                    </div>
                </div>
            </div>
        );
    }
}

const SheetCard = connect(mapStateToProps, mapDispatchToProps)(_SheetCard)


export default SheetCard;
