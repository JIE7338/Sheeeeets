
/////////// CREATING NEW SHEETS ////////////////////
export const SUBMIT_CREATE_NEW_SHEET = 'SUBMIT_CREATE_NEW_SHEET';
export const RECEIVE_CREATE_NEW_SHEET = 'RECEIVE_CREATE_NEW_SHEET';
export const CHANGE_NAME_NEW_SHEET = 'CHANGE_NAME_NEW_SHEET';

function submitCreateNewSheet(name) {
    return {type: SUBMIT_CREATE_NEW_SHEET, name};
}
function receiveCreateNewSheet(name, error) {
    return {type: RECEIVE_CREATE_NEW_SHEET, name, error};
}
export function changeNewSheetName(name) {
    return {type: CHANGE_NAME_NEW_SHEET, name};
}
export function createNewSheet(name, username) {
    return function (dispatch) {
        dispatch(submitCreateNewSheet(username));
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/addSheet?username='
            + username + '&name=' + name, {
                mode: 'cors',
                method: 'POST',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            dispatch(getSheets(username));
            return dispatch(receiveCreateNewSheet(name));
        });
    }
}
///////////////////////////////////////////////////

/////////////// HANDLEING SHEETS //////////////////
export const SUBMIT_GET_SHEETS = 'SUBMIT_GET_SHEETS';
export const RECEIVE_GET_SHEETS = 'RECEIVE_GET_SHEETS';
export const CHANGE_NAME_SHEET = 'CHANGE_NAME_SHEET';

function submitGetSheets() {
    return {type: SUBMIT_GET_SHEETS};
}
function receiveGetSheets(sheets, dates) {
    return {type: RECEIVE_GET_SHEETS, sheets, dates};
}
export function getSheets(username) {
    return function (dispatch) {
        dispatch(submitGetSheets());
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getSheets?username='
                + username, {
                mode: 'cors',
                method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            return dispatch(receiveGetSheets(json.names, json.dates));
        });
    }
}
export function deleteSheet(username, sheetName) {
    return function (dispatch) {
        dispatch(submitGetSheets());
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/deleteSheet?username='
                + username + '&title=' + sheetName, {
                mode: 'cors',
                method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            return dispatch(getSheets(username));
        });
    }
}




/////// CHANGING SHEET NAMES
export const SET_NAME_OF_SHEET_BEING_EDITED = 'SET_NAME_OF_SHEET_BEING_EDITED';
export const SET_NEW_SHEET_NAME = 'SET_NEW_SHEET_NAME';
export const REQUEST_CHANGE_SHEET_NAME = 'REQUEST_CHANGE_SHEET_NAME';
export const RECEIVE_CHANGE_SHEET_NAME = 'RECEIVE_CHANGE_SHEET_NAME';
export function suggestNewSheetName(sheetName) {
    return function (dispatch) {
        dispatch(setNameOfSheetBeingEdited(sheetName));
        dispatch(setNewSheetName(sheetName));
    }
}
// The sheet to edit
export function setNameOfSheetBeingEdited(sheetName) {
    return {type: SET_NAME_OF_SHEET_BEING_EDITED, sheetName};
}
// The new name
export function setNewSheetName(sheetName) {
    return {type: SET_NEW_SHEET_NAME, sheetName};
}
export function requestChangeSheetName() {
    return {type: REQUEST_CHANGE_SHEET_NAME};
}
export function receiveChangeSheetName() {
    return {type: RECEIVE_CHANGE_SHEET_NAME};
}
export function changeSheetName(username, sheetName, newSheetName) {
    return function (dispatch) {
        dispatch(requestChangeSheetName());
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/renameSheet?username='
                + username + '&title='
                + sheetName + '&newtitle='
                + newSheetName, {
                mode: 'cors',
                method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            console.log(json);
            dispatch(getSheets(username));
            dispatch(receiveChangeSheetName());
            dispatch(suggestNewSheetName(null));
        });
    }
}

////////////// POP UP MESSAGE MODAL //////////////////////
export const EDIT_MESSAGE_MODAL =  'EDIT_MESSAGE_MODAL';

export function editMessageModal({show, message}) {
    return {type: EDIT_MESSAGE_MODAL, show, message};
}
export function showMessageModal(message) {
    return function (dispatch) {
        dispatch(editMessageModal({
            message: message,
            show: true
        }));
        setTimeout(() => dispatch(editMessageModal({
            show: false,
        })), 1000);
    }
}

/////////////////  LOGGIN IN   /////////////////////////////
export const SESSION_REQUEST_LOGIN = 'SESSION_REQUEST_LOGIN';
export const SESSION_RECEIVE_LOGIN = 'SESSION_RECEIVE_LOGIN';
export const LOGIN_SET_USERNAME_PASSWORD = 'LOGIN_SET_USERNAME_PASSWORD';
export const SUBMIT_LOGIN_INFO = 'SUBMIT_LOGIN_INFO';

export function requestLogin(username) {
    return {
        type: SESSION_REQUEST_LOGIN,
        username
    }
}

export function receiveLogin(username, isLoggedIn, error) {
    return {
        type: SESSION_RECEIVE_LOGIN,
        username,
        isLoggedIn,
        timeLoggedIn: Date.now(),
        error
    }
}
export function attemptLogin(username, password) {

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestLogin(username));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/login?username='
            + username + '&password=' + password, {
                mode: 'cors',
                method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            const isLoggedIn = (json.response === 'Login Success');
            const error = (isLoggedIn) ? null : 'Error logging in';
            if (isLoggedIn) {
                dispatch(getUser(username, password));
                dispatch(showMessageModal('Login Successful'));
            }
            return dispatch(receiveLogin(username, isLoggedIn, error));
        });
    }
}
export function setUsernamePassword(username, password) {
    return { type: LOGIN_SET_USERNAME_PASSWORD, username, password}
}

export function submitLoginInfo(key, value) {
    return {
        type: SUBMIT_LOGIN_INFO,
        key,
        value,
    }
}

///////////////// Log out /////////////////////
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export function requestLogout() {
    return function (dispatch) {
        dispatch(logout());
        dispatch(showMessageModal('Logout Successful!'));
    }
}
export function logout() {
    return {
        type: SESSION_LOGOUT,
    }
}

/////////////////// Get User Info ////////////////////
export const ADD_ACCOUNT_INFO_TO_SESSION = 'ADD_ACCOUNT_INFO_TO_SESSION';

export function getUser(username, password) {
    return function (dispatch) {

        fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getUser?username=' + username, {
                mode: 'cors',
                method: 'GET',
            })
            .then((response) => response.json(),
                (error) => console.log('An error occured.', error))
            .then((json) => {
                dispatch(addAccountInfoToSession({
                    email: json.email,
                    firstName: json.firstName,
                    lastName: json.lastName,
                    username,
                    password,
                }));
        })
    }
}
export function addAccountInfoToSession({username, password, firstName, lastName, email}) {
    return {
        type: ADD_ACCOUNT_INFO_TO_SESSION,
        username,
        password,
        firstName,
        lastName,
        email
    }
}

//////////// REGISTER //////////////////

export const REGISTER_SET_VALUES =  'REGISTER_SET_VALUES';
export const REQUEST_REGISTER =  'REQUEST_REGISTER';
export const RECEIVE_REGISTER =  'RECEIVE_REGISTER';
export const SUBMIT_REGISTRATION_INFO =  'SUBMIT_REGISTRATION_INFO';
export const _LOGIN_TOGGLE_REGISTER = '_LOGIN_TOGGLE_REGISTER';


export function toggleRegister() {
    return { type: _LOGIN_TOGGLE_REGISTER}
}

export function requestRegister() {
    return {
        type: REQUEST_REGISTER,
    }
}
export function receiveRegister(success, error) {
    return {
        type: RECEIVE_REGISTER,
        wasSuccessful: success,
        error,
    }
}
export function submitRegistrationInfo(key, value) {
    return {
        type: SUBMIT_REGISTRATION_INFO,
        key,
        value,
    }
}
export function setValuesForRegister(username, password, firstName, lastName, email) {
    return { type: REGISTER_SET_VALUES, username, password, firstName, lastName, email}
}

export function attemptRegister({username, password, firstName, lastName, email}) {
    return function (dispatch) {
        dispatch(requestRegister());
        if(username.length < 1 || password.length < 1 || firstName.length < 1 || lastName.length < 1 || email.length < 1) {
            const success = false;
            const error = 'Please finish filling in the form'
            return dispatch(receiveRegister(success, error));
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/register?username=" +
            `${username}&password=${password}&email=${email}&firstName=${firstName}&lastName=${lastName}`, {
            method: "POST",
            mode: 'cors',
        })
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            const success = json.response === 'Success: User registered';
            if (success) {
                dispatch(toggleRegister());
                dispatch(showMessageModal('Registration Successful!'));
                dispatch(setUsernamePassword(username, ''));
                dispatch(setValuesForRegister('', '', '', '', ''));
            }
            const error = (success) ? null : json.response;
            return dispatch(receiveRegister(success, error));
        });
    }
}

//////////// CHANGE PASSWORD //////////////////
export const _ACCOUNT_TOGGLE_PASSWORD = '_ACCOUNT_TOGGLE_PASSWORD';
export const SET_VALUE_NEW_PASSWORD = 'SET_VALUE_NEW_PASSWORD';
export const RECEIVE_NEW_PASSWORD = 'RECEIVE_NEW_PASSWORD';
export const SUBMIT_NEW_PASSWORD = 'SUBMIT_NEW_PASSWORD';


export function attemptChangePassword({username, password}) {
    return function (dispatch) {
        if(password.length < 1) {
            dispatch(receiveNewPassword({error:'Please finish filling in the form'}));
                return;
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/changePassword?username=" +
            `${username}&newPassword=${password}`, {
            method: "POST",
            mode: 'cors',
        })
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            if (json.response === 'Success') {
                dispatch(getUser(username, password));
                dispatch(toggleChangePasswordModal());
                dispatch(showMessageModal('Password Update Successful!'));
                dispatch(changeValueNewPassword(''));
                dispatch(receiveNewPassword({error:null}));
            }
            return;
        });
    }
}
function receiveNewPassword({error}) {
    return {
        type: RECEIVE_NEW_PASSWORD,
        error,
    }
}
export function toggleChangePasswordModal() {
    return {
        type: _ACCOUNT_TOGGLE_PASSWORD
    }
}

export function changeValueNewPassword(password) {
    return {
        type: SET_VALUE_NEW_PASSWORD,
        password
    }
}

////////// CHANGE EMAIL //////////////////
export const _ACCOUNT_TOGGLE_EMAIL = '_ACCOUNT_TOGGLE_EMAIL';
export const SET_VALUE_NEW_EMAIL = 'SET_VALUE_NEW_EMAIL';
export const RECEIVE_NEW_EMAIL = 'RECEIVE_NEW_EMAIL';
export const SUBMIT_NEW_EMAIL = 'SUBMIT_NEW_EMAIL';

export function attemptChangeEmail({username, email, password}) {
    return function (dispatch) {
        if(email.length < 1) {
            dispatch(receiveNewEmail({error:'Please finish filling in the form'}));
            return;
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/changeEmail?username=" +
            `${username}&newEmail=${email}`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
            }),
            body: JSON.stringify({
                name: username,
                email: email
            }),
        })
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            const success = json.response === 'Success';
            if (success) {
                dispatch(getUser(username, password));
                dispatch(toggleChangeEmailModal());
                dispatch(showMessageModal('Email Update Successful!'));
                dispatch(changeValueNewEmail(''));
                dispatch(receiveNewEmail({error:null}));
            }
        });
    }
}
function receiveNewEmail({error}) {
    return {
        type: RECEIVE_NEW_EMAIL,
        error,
    }
}

export function toggleChangeEmailModal() {
    return {
        type: _ACCOUNT_TOGGLE_EMAIL
    }
}

export function changeValueNewEmail(email) {
    return {
        type: SET_VALUE_NEW_EMAIL,
        email
    }
}












