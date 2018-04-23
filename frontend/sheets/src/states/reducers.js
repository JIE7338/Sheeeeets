import { combineReducers } from 'redux'
import { defaultJSON } from '../data/defaults'

import {
            SESSION_REQUEST_LOGIN,
            SESSION_RECEIVE_LOGIN,
            SESSION_LOGOUT,
            LOGIN_SET_USERNAME_PASSWORD,
            _LOGIN_TOGGLE_REGISTER,
            SUBMIT_LOGIN_INFO,

            REGISTER_SET_VALUES,
            REQUEST_REGISTER,
            RECEIVE_REGISTER,
            SUBMIT_REGISTRATION_INFO,

            EDIT_MESSAGE_MODAL,

            ADD_ACCOUNT_INFO_TO_SESSION,

            _ACCOUNT_TOGGLE_PASSWORD,
            _ACCOUNT_TOGGLE_EMAIL,
            SET_VALUE_NEW_PASSWORD,
            SET_VALUE_NEW_EMAIL,
            RECEIVE_NEW_PASSWORD,
            RECEIVE_NEW_EMAIL,

            SUBMIT_CREATE_NEW_SHEET,
            RECEIVE_CREATE_NEW_SHEET,
            CHANGE_NAME_NEW_SHEET,
            RECEIVE_GET_SHEETS,
            SET_NAME_OF_SHEET_BEING_EDITED,
            SET_NEW_SHEET_NAME,
            REQUEST_CHANGE_SHEET_NAME,
            RECEIVE_CHANGE_SHEET_NAME,

            OPEN_THIS_SHEET,

            RECEIVE_GET_SHEET_JSON,
            REMOVE_CURRENT_SHEET_INFO,
                                    } from './actions'

//


// ==========================================
const defaultSingleSheetState = {
    JSON: defaultJSON(),
};

function sheetPage(state= defaultSingleSheetState, action) {
    switch(action.type) {
        case OPEN_THIS_SHEET:
            return Object.assign({}, state, {
                sheetName: action.sheet,
            });
        case RECEIVE_GET_SHEET_JSON:
            return Object.assign({}, state, {
                JSON: action.json,
            });
        case REMOVE_CURRENT_SHEET_INFO:
            return Object.assign({}, state, {
                JSON: defaultJSON(),
            });
        default:
            return state
    }
}



// ==========================================
//DO NOT PUSH BEFORE CHANGING BACK TO FALSE
const defaultSessionState = {
    isFetching: false,
    username: null,
    isLoggedIn: false,
    timeLoggedIn: false,
    error: null
}

function session(state = defaultSessionState, action) {
    switch (action.type) {
        case SESSION_REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                username: action.username,
            });
        case SESSION_RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                username: action.username,
                isLoggedIn: action.isLoggedIn,
                timeLoggedIn: action.timeLoggedIn,
                error: action.error
            });
        case SESSION_LOGOUT:
            return Object.assign({}, defaultSessionState);
        case ADD_ACCOUNT_INFO_TO_SESSION:
            return Object.assign({}, state, {
                username: action.username,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                password: action.password
            });
    default:
      return state
  }
}
// ==========================================


// ==========================================
const defaultLoginState = {
    registerIsToggled: false,
    username: '',
    password: ''
}

function login(state = defaultLoginState, action) {
    switch (action.type) {
        case LOGIN_SET_USERNAME_PASSWORD:
            return Object.assign({}, state, {username: action.username, password: action.password});
        case _LOGIN_TOGGLE_REGISTER:
            return Object.assign({}, state, {registerIsToggled: !state.registerIsToggled});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultLoginState);
        case SUBMIT_LOGIN_INFO: {
            const obj = {};
            obj[action.key] = action.value;
            return Object.assign({}, state, obj);
        }
        default:
            return state
    }
}
// ==========================================
const defaultAccountManagerState = {
    changeEmailModalIsToggled: false,
    changePasswordModalIsToggled: false,
    newPassword: null,
    newEmail: null,
    error: null,
}

function accountManager(state = defaultAccountManagerState, action) {
    switch (action.type) {
        case _ACCOUNT_TOGGLE_EMAIL:
            return Object.assign({}, state, {changeEmailModalIsToggled: !state.changeEmailModalIsToggled, error:null});
        case _ACCOUNT_TOGGLE_PASSWORD:
            return Object.assign({}, state, {changePasswordModalIsToggled: !state.changePasswordModalIsToggled, error:null});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultLoginState);
        case SET_VALUE_NEW_PASSWORD:
            return Object.assign({}, state, {newPassword: action.password});
        case SET_VALUE_NEW_EMAIL:
            return Object.assign({}, state, {newEmail: action.email});
        case RECEIVE_NEW_PASSWORD:
            return Object.assign({}, state, {error: action.error});
        case RECEIVE_NEW_EMAIL:
            return Object.assign({}, state, {error: action.error});
        default:
            return state
    }
}


// ==========================================
const defaultRegisterState = {
    isRegistering: false,
    wasSuccessful: true,
    error: null,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
}

function register(state = defaultRegisterState, action) {
    switch (action.type) {
        case REQUEST_REGISTER:
            return Object.assign({}, state, {isRegistering: true});
        case SUBMIT_REGISTRATION_INFO:
            const obj = {};
            obj[action.key] = action.value;
            return Object.assign({}, state, obj);
        case RECEIVE_REGISTER:
            return Object.assign({}, state, {isRegistering: false, wasSuccessful: action.wasSuccessful,
                error: action.error});
        case REGISTER_SET_VALUES:
            return Object.assign({}, state, {username: action.username, password: action.password,
                firstName: action.firstName, lastName: action.lastName, email: action.email});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultRegisterState);
        default:
            return state
    }
}
// ==========================================
const defaultModalState = {
    show: false,
    message: '',
}
function messageModal(state = defaultModalState, action) {
    switch (action.type) {
        case EDIT_MESSAGE_MODAL:
            return Object.assign({}, state, {message: action.message, show: action.show});
        default:
            return state
    }
}
// ==========================================
const defaultNewSheetState = {
    isFetching: false,
    error: null,
    name: '',
}
function newSheet(state = defaultNewSheetState, action) {
    switch (action.type) {
        case SUBMIT_CREATE_NEW_SHEET:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_CREATE_NEW_SHEET:
            return Object.assign({}, state, {isFetching: false, error: action.error});
        case CHANGE_NAME_NEW_SHEET:
            return Object.assign({}, state, {name: action.name});
        default:
            return state
    }
}
// ====================================
const defaultSheetState = {
    sheets: []
}
function sheets(state = defaultSheetState, action) {
    switch (action.type) {
        case RECEIVE_GET_SHEETS:
            return Object.assign({}, state, {sheets: action.sheets, dates: action.dates});
        case SET_NAME_OF_SHEET_BEING_EDITED:
            return Object.assign({}, state, {sheetBeingEdited: action.sheetName});
        case SET_NEW_SHEET_NAME:
            return Object.assign({}, state, {newSheetName: action.sheetName});
        case REQUEST_CHANGE_SHEET_NAME:
            return Object.assign({}, state);
        case RECEIVE_CHANGE_SHEET_NAME:
            return Object.assign({}, state);
        default:
            return state
    }
}






const todoApp = combineReducers({
  session, login, register, messageModal, accountManager, newSheet, sheets, sheetPage
})

export default todoApp
