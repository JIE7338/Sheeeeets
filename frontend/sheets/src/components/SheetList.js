import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSheets } from '../states/actions'
import SheetCard from './SheetCard'


const mapStateToProps = (state, ownProps) => {
    return {
        sheets: state.sheets.sheets,
        dates: state.sheets.dates,
        username: state.session.username,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getSheets: (username) => {
            dispatch(getSheets(username));
        }
    }
}

const _SheetList = class extends Component {
    constructor(props) {
        super(...props);
    }
    componentWillMount() {
        this.props.getSheets(this.props.username);
    }


    render() {
        return (
            <div className="columns is-multiline">
                {this.props.sheets.map((sheet,i) => {
                    return <div key={i} className='column is-one-third '>
                        <SheetCard sheet={sheet} date={this.props.dates[i]}/>
                    </div>
                })}
            </div>
        );
    }
}

const SheetList = connect(mapStateToProps, mapDispatchToProps)(_SheetList)


export default SheetList;
