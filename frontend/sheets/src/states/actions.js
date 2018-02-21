/*
 * action types
 */
export const SESSION_REQUEST_LOGIN = 'SESSION_REQUEST_LOGIN';
export const SESSION_RECEIVE_LOGIN = 'SESSION_RECEIVE_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const LOGIN_SET_USERNAME_PASSWORD = 'LOGIN_SET_USERNAME_PASSWORD';
export const _LOGIN_TOGGLE_REGISTER = '_LOGIN_TOGGLE_REGISTER';
export const SUBMIT_LOGIN_INFO = 'SUBMIT_LOGIN_INFO';


export const REGISTER_SET_VALUES =  'REGISTER_SET_VALUES';
export const REQUEST_REGISTER =  'REQUEST_REGISTER';
export const RECEIVE_REGISTER =  'RECEIVE_REGISTER';
export const SUBMIT_REGISTRATION_INFO =  'SUBMIT_REGISTRATION_INFO';

export const EDIT_MESSAGE_MODAL =  'EDIT_MESSAGE_MODAL';
export const _ACCOUNT_TOGGLE_PASSWORD = '_ACCOUNT_TOGGLE_PASSWORD';
export const _ACCOUNT_TOGGLE_EMAIL = '_ACCOUNT_TOGGLE_EMAIL';
export const ADD_ACCOUNT_INFO_TO_ACCOUNT = 'ADD_ACCOUNT_INFO_TO_ACCOUNT';

export const PASSWORD_SET_VALUES = 'PASSWORD_SET_VALUES';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const RECEIVE_PASSWORD = 'RECEIVE_PASSWORD';
export const SUBMIT_PASSWORD = 'SUBMIT_PASSWORD';

export const EMAIL_SET_VALUES = 'EMAIL_SET_VALUES';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';


export const ADD_ACCOUNT_INFO_TO_SESSION = 'ADD_ACCOUNT_INFO_TO_SESSION';

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
    console.log(username)
    return function (dispatch) {
        dispatch(submitCreateNewSheet(username));
        console.log(name)
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/addSheet?username='
            + username + '&name=' + name, {
                mode: 'cors',
                method: 'POST',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            console.log(json);
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
function receiveGetSheets(sheets) {
    return {type: RECEIVE_GET_SHEETS, sheets};
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
            console.log(json);
            return dispatch(receiveGetSheets(json.names));
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
export function receivetChangeSheetName() {
    return {type: RECEIVE_CHANGE_SHEET_NAME};
}
export function changeSheetName(name) {
    return function (dispatch) {
        dispatch(requestChangeSheetName());
        return fetch('www.google.com.json')
        .then((r) => console.log(r))
        .then((r) => {
            dispatch(receivetChangeSheetName());
            dispatch(suggestNewSheetName(null));
        });
    }
}




///////////////////////////////////////////////////

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

///////////////////////////////////////////////////


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
                dispatch(showMessageModal('Login'));
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
                        username: json.username}));
                    dispatch(addAccountInfoToAccount({
                        email: json.email,
                        firstName: json.firstName,
                        lastName: json.lastName,
                        username: json.username}))
                })
            }
            return dispatch(receiveLogin(username, isLoggedIn, error));
        });
    }
}

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

export function updateEmail() {
    return {
        type: UPDATE_EMAIL
    }
}

export function receiveEmail(success, error) {
    return {
        type: RECEIVE_EMAIL,
        wasSuccessful: success,
        error,
    }
}

export function updatePassword() {
    return {
        type: UPDATE_PASSWORD
    }
}

export function receivePass(success, error) {
    return {
        type: RECEIVE_PASSWORD,
        wasSuccessful: success,
        error,
    }
}

export function attemptRegister({username, password, firstName, lastName, email}) {
    return function (dispatch) {
        dispatch(requestRegister());
        if(username.length < 1 || password.length < 1 || firstName.length < 1 || lastName.length < 1 || email.length < 1) {
            const success = false;
            const error = 'Please finish filling in the form'
            console.log('not long enough')
            return dispatch(receiveRegister(success, error));
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/register?username=" +
            `${username}&password=${password}&email=${email}&firstName=${firstName}&lastName=${lastName}`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
            }),
            body: JSON.stringify({
                name : username,
                pass : password,
                first : firstName,
                last : lastName,
                email : email
            }),
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

export function addAccountInfoToAccount({username, firstName, lastName, email}) {
    return {
        type: ADD_ACCOUNT_INFO_TO_ACCOUNT,
        username,
        firstName,
        lastName,
        email
    }
}

export function attemptPassword({username, password}) {
    return function (dispatch) {
        dispatch(updatePassword());
        if(password.length < 1) {
            const success = false;
            const error = 'Please finish filling in the form'
            console.log('not long enough')
            return dispatch(receivePass(success, error));
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/changePassword?username=" +
            `${username}&newPassword=${password}`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
            }),
            body: JSON.stringify({
                name: username,
                pass: password
            }),
        })
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            const success = json.response === 'Success';
            if (success) {
                dispatch(togglePassword());
                dispatch(showMessageModal('Password Update Successful!'));
                dispatch(setValuesForPassword(''));
            }
            const error = (success) ? null : json.response;
            return dispatch(receivePass(success, error));
        });
    }
}

export function attemptEmail({username, email}) {
    return function (dispatch) {
        dispatch(updateEmail());
        if(email.length < 1) {
            const success = false;
            const error = 'Please finish filling in the form'
            console.log('not long enough')
            return dispatch(receiveEmail(success, error));
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/changePassword?username=" +
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
                dispatch(toggleEmail());
                dispatch(showMessageModal('Email Update Successful!'));
                dispatch(setValuesForEmail(''));
            }
            const error = (success) ? null : json.response;
            return dispatch(receiveEmail(success, error));
        });
    }
}

export function toggleRegister() {
    return { type: _LOGIN_TOGGLE_REGISTER}
}

export function togglePassword() {
    return {
        type: _ACCOUNT_TOGGLE_PASSWORD
    }
}

export function toggleEmail() {
    return {
        type: _ACCOUNT_TOGGLE_EMAIL
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

export function submitEmail(key, value) {
    return {
        type: SUBMIT_EMAIL,
        key,
        value
    }
}

export function submitPassword(key, value) {
    return {
        type: SUBMIT_PASSWORD,
        key,
        value
    }
}

export function setValuesForRegister(username, password, firstName, lastName, email) {
    return { type: REGISTER_SET_VALUES, username, password, firstName, lastName, email}
}

export function setValuesForEmail(username, email) {
    return { type: EMAIL_SET_VALUES, username, email}
}

export function setValuesForPassword(username, password) {
    return { type: PASSWORD_SET_VALUES, username, password}
}












