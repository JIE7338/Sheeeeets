import { combineReducers } from 'redux'

import {
            SESSION,
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
            PASSWORD_SET_VALUES,
            UPDATE_PASSWORD,
            RECEIVE_PASSWORD,
            SUBMIT_PASSWORD,
            _ACCOUNT_TOGGLE_PASSWORD,
            EMAIL_SET_VALUES,
            UPDATE_EMAIL,
            RECEIVE_EMAIL,
            SUBMIT_EMAIL,
            _ACCOUNT_TOGGLE_EMAIL,
                                    } from './actions'




// ==========================================
const defaultSessionState = {
    isFetching: false,
    username: null,
    isLoggedIn: false,
    timeLoggedIn: false,
    error: null
}

function session(state = defaultSessionState, action) {
    switch (action.type) {
        case SESSION:
            return Object.assign({}, state, {id: action.id});
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
                email: action.email
            });
    default:
      return state
  }
}
// ==========================================


// ==========================================
const defaultLoginState = {
    registerIsToggled: false
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
const defaultAccountState = {
    emailIsToggled: false,
    passwordIsToggled: false,
    username: null,
    password: null,
    email: null,
    firstName: null,
    lastName: null
}

function account(state = defaultAccountState, action) {
    switch (action.type) {
        case _ACCOUNT_TOGGLE_EMAIL:
            return Object.assign({}, state, {emailIsToggled: !state.emailIsToggled});
        case _ACCOUNT_TOGGLE_PASSWORD:
            return Object.assign({}, state, {passwordIsToggled: !state.passwordIsToggled});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultLoginState);
        default:
            return state
    }
}

const defaultPasswordState = {
    isUpdatePassword: false,
    wasSuccessful: true,
    error: null,
    username: null,
    password: '',
}

function password(state = defaultPasswordState, action) {
    switch (action.type) {
        case UPDATE_PASSWORD:
            return Object.assign({}, state, {isUpdatePassword: true});
        case SUBMIT_PASSWORD:
            const obj = {};
            obj[action.key] = action.value;
            return Object.assign({}, state, obj);
        case RECEIVE_PASSWORD:
            return Object.assign({}, state, {isUpdatePassword: false, wasSuccessful: action.wasSuccessful,
                error: action.error});
        case PASSWORD_SET_VALUES:
            return Object.assign({}, state, {username: action.username, password: action.password});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultRegisterState);
        default:
            return state
    }
}

const defaultEmailState = {
    isUpdateEmail: false,
    wasSuccessful: true,
    error: null,
    username: null,
    email: '',
}

function email(state = defaultEmailState, action) {
    switch (action.type) {
        case UPDATE_EMAIL:
            return Object.assign({}, state, {isUpdateEmail: true});
        case SUBMIT_EMAIL:
            const obj = {};
            obj[action.key] = action.value;
            return Object.assign({}, state, obj);
        case RECEIVE_EMAIL:
            return Object.assign({}, state, {isUpdateEmail: false, wasSuccessful: action.wasSuccessful,
                error: action.error});
        case EMAIL_SET_VALUES:
            return Object.assign({}, state, {username: action.username, email: action.email});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultRegisterState);
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



const todoApp = combineReducers({
  session, login, register, messageModal, account, email, password
})

export default todoApp
