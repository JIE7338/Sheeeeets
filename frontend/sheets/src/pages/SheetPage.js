import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewSheetInput from '../components/NewSheetInput'
import SheetList from '../components/SheetList'
import { getSheetJSON, saveSheetJSON, removeCurrentSheetInfo } from '../states/actions'
import ReactDataSheet from 'react-datasheet';

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.session.username,
        sheetName: state.sheetPage.sheetName,
        sheetJSON: state.sheetPage.JSON
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getSheetJSON: (username, sheet) => {
            dispatch(getSheetJSON(username, sheet));
        },
        saveSheetJSON: (username, sheet, json) => {
            dispatch(saveSheetJSON(username, sheet, json));
        },
        removeCurrentSheetInfo: () => {
            dispatch(removeCurrentSheetInfo());
        }
    }
}

const _SheetPage = class extends Component {
    constructor (props) {
        super(props)
        this.sheetObject = this.createSheet(this.props.sheetJSON);
        this.sheetObject.addData();

        this.props.getSheetJSON(this.props.username, this.props.sheetName)
    }
    createSheet(json) {
        const iface = {
            get: () => {
                return iface.table;
            },
            _json: json,
        };
        let maxRow = 2;
        let maxColumn = 2;
        iface.getDimensions = () => {
            for (const column of Object.keys(iface._json.columns)) {
                for (const row of Object.keys(iface._json.columns[column].rows)) {
                    if (row > maxRow) {
                        maxRow = row;
                    }
                }
                if (column > maxColumn) {
                    maxColumn = column;
                }
            }
        }
        iface.getDimensions();
        iface.setJSON = (json) => {
            iface._json = json;
            iface.addData();
        }
        iface.emptyTable = () => {
            const table = [];
            for (let i = 0; i < parseInt(maxRow) + 1; i++) {

                const row = []
                for (let j = 0; j < parseInt(maxColumn) + 1; j++) {
                    row.push({ width:40});
                }
                table.push(row);
            }
            table[0].push({
                component: (<div>
                    <input  className={'add-button'} type='button' value='Add column'
                        onClick={() => {
                            iface.addColumn();
                        }}></input>
                </div>),
                forceComponent: true,
                rowSpan: parseInt(maxRow) + 1,
            })
            table.push([
                {
                  component: (<div>
                    <input className={'add-button'} type='button' value='Add row'
                        onClick={() => {
                            iface.addRow();
                        }}></input>
                  </div>),
                  forceComponent: true,
                  colSpan: parseInt(maxColumn) + 1,
                },
            ]);
            iface.table = table;
            return table;
        }
        iface.table = iface.emptyTable();
        iface.addData = () => {
            iface.getDimensions();
            iface.emptyTable();
            for (const column of Object.keys(iface._json.columns)) {
                for (const row of Object.keys(iface._json.columns[column].rows)) {
                    iface.table[row][column].value = iface._json.columns[column].rows[row];
                }
            }
        }

        iface.addRow = () => {
            maxRow++;
            iface.update();
        }
        iface.addColumn = () => {
            maxColumn++;
            iface.update();
        }
        iface.updateTable = () => {
            iface.addData();
        }
        iface.update = () => {
            iface.updateTable()
            this.forceUpdate();
            console.log(iface._json);
        }
        iface.changeCell = ({cell, row, col, value}) => {
            if (!iface._json.columns[col]) {
                iface._json.columns[col] = {rows: {}}
            }
            iface._json.columns[col].rows[row] = value;
            iface.update();
            this.props.saveSheetJSON(this.props.username, this.props.sheetName, iface._json);
        }
        iface.export = () => {
            return iface._json;
        }
        return iface;
    }

    componentWillUnmount() {
        this.props.removeCurrentSheetInfo();
    }



    columns = ['1', '2'];
    render() {
        this.sheetObject.setJSON(this.props.sheetJSON);
        this.sheetObject.updateTable();
        const sheet = this.sheetObject.get()
        return <div className="section">
                    <div className='title'>{this.props.sheetName}</div>
                    <ReactDataSheet
                        data={sheet}
                        valueRenderer={(cell) => cell.value}
                        onCellsChanged={changes => {
                            changes.forEach(({cell, row, col, value}) => {
                                this.sheetObject.changeCell({cell, row, col, value});
                            })
                        }}
                        sheetRenderer={props => (
                            <table className={props.className + ' my-awesome-extra-class'}>
                                <thead>
                                    <tr>
                                        {this.columns.map((col, i) => {
                                            return (<th key={i}>{col}</th>)
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.children}
                                </tbody>
                            </table>
                        )}
                    />
                </div>;
    }

}

const SheetPage = connect(mapStateToProps, mapDispatchToProps)(_SheetPage)

export default SheetPage;
