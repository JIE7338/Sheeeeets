import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewSheetInput from '../components/NewSheetInput'
import SheetList from '../components/SheetList'
import {  } from '../states/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        registerIsToggled: state.login.registerIsToggled,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const _Dashboard = class extends Component {


    render() {
        return <div className="section">
                    <div className="section">
                        <NewSheetInput/>
                    </div>
                    <div className="section">
                        <SheetList/>
                    </div>
                </div>;
    }

}
const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)

export default Dashboard;
