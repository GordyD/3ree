import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = '';
const eventsUrl = `${serverUrl}/api/0/events`;
const usersUrl = `${serverUrl}/api/0/users`;

export function setUserId(userId) {
  return {
    type: types.SET_USER_ID,
    userId
  };
}

export function loadEvents() {
  return dispatch => {
    dispatch(loadEventsRequest());
    return request
      .get(eventsUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loadEventsFailure(err));
        } else {
          dispatch(loadEventsSuccess(res.body));
        }
      });
  };
}

export function loadEventsRequest() {
  return {
    type: types.LOAD_EVENTS_REQUEST
  };
}

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_SUCCESS,
    events
  };
}

export function loadEventsFailure(error) {
  return {
    type: types.LOAD_EVENTS_FAILURE,
    error
  };
}

// -------------------------------------------------------
// Add User
// -------------------------------------------------------
export function addUser(user) {
  console.log('Add User', user);

  return dispatch => {
    dispatch(addUserRequest(user));

    return request
    .post(usersUrl)
    .send(user)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(addUserFailure(err, event));
      } else {
        dispatch(addUserSuccess(res.body));
      }
    });
  };
}

export function addUserRequest(user) {
  return {
    type: types.ADD_USER_REQUEST,
    user
  };
}

export function addUserSuccess(user) {
  return {
    type: types.ADD_USER_SUCCESS,
    user
  };
}

export function addUserFailure(error, user) {
  return {
    type: types.ADD_USER_FAILURE,
    error
  };
}

// -------------------------------------------------------
// Delete User
// -------------------------------------------------------
export function deleteUser(user) {
  return dispatch => {
    dispatch(deleteUserRequest(user));

    return request
    .del(usersUrl + '/' + user.id)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(deleteUserFailure(err, user));
      } else {
        dispatch(deleteUserSuccess(res.body));
      }
    });
  };
}

export function deleteUserRequest(user) {
  return {
    type: types.DELETE_USER_REQUEST,
    user
  };
}

export function deleteUserSuccess(user) {
  return {
    type: types.DELETE_USER_SUCCESS,
    user
  };
}

export function deleteUserFailure(error, user) {
  return {
    type: types.DELETE_USER_FAILURE,
    error,
    user
  };
}

// -------------------------------------------------------
// Edit User
// -------------------------------------------------------
export function editUser(user) {
  return dispatch => {
    dispatch(editUserRequest(user));

    return request
      .post(usersUrl + '/' + user.id)
      .send(user)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(editUserFailure(err, user));
        } else {
          dispatch(editUserSuccess(res.body));
        }
      });
  };
}

export function editUserRequest(user) {
  return {
    type: types.EDIT_USER_REQUEST,
    user
  };
}

export function editUserSuccess(user) {
  return {
    type: types.EDIT_USER_SUCCESS,
    user
  };
}

export function editUserFailure(error, user) {
  return {
    type: types.EDIT_USER_FAILURE,
    error,
    user
  };
}

// -------------------------------------------------------
// Add Event
// -------------------------------------------------------
export function addEvent(event) {
  console.log('Add event', event);
  return dispatch => {
    dispatch(addEventRequest(event));

    return request
      .post(eventsUrl)
      .send(event)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addEventFailure(err, event));
        } else {
          dispatch(addEventSuccess(res.body));
        }
      });
  };
}

export function addEventRequest(event) {
  return {
    type: types.ADD_EVENT_REQUEST,
    event
  };
}

export function addEventSuccess(event) {
  return {
    type: types.ADD_EVENT_SUCCESS,
    event
  };
}

export function addEventFailure(error, event) {
  return {
    type: types.ADD_EVENT_FAILURE,
    error
  };
}

// -------------------------------------------------------
// Delete Event
// -------------------------------------------------------
export function deleteEvent(event) {
  return dispatch => {
    dispatch(deleteEventRequest(event));

    return request
      .del(eventsUrl + '/' + event.id)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(deleteEventFailure(err, event));
        } else {
          dispatch(deleteEventSuccess(res.body));
        }
      });
  };
}

export function deleteEventRequest(event) {
  return {
    type: types.DELETE_EVENT_REQUEST,
    event
  };
}

export function deleteEventSuccess(event) {
  return {
    type: types.DELETE_EVENT_SUCCESS,
    event
  };
}

export function deleteEventFailure(error, event) {
  return {
    type: types.DELETE_EVENT_FAILURE,
    error,
    event
  };
}

// -------------------------------------------------------
// Edit Event
// -------------------------------------------------------
export function editEvent(event) {
  return dispatch => {
    dispatch(editEventRequest(event));

    return request
      .post(eventsUrl + '/' + event.id)
      .send(event)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(editEventFailure(err, event));
        } else {
          dispatch(editEventSuccess(res.body));
        }
      });
  };
}

export function editEventRequest(event) {
  return {
    type: types.EDIT_EVENT_REQUEST,
    event
  };
}

export function editEventSuccess(event) {
  return {
    type: types.EDIT_EVENT_SUCCESS,
    event
  };
}

export function editEventFailure(error, event) {
  return {
    type: types.EDIT_EVENT_FAILURE,
    error,
    event
  };
}
