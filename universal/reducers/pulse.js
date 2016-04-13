import {
  LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE,
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
  EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE,
  ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
  SET_USER_ID
} from '../constants/ActionTypes';

const initialState = {
  isWorking: false,
  userId: null,
  error: null,
  events: [],
  users: []
};

export default function pulses(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.userId
      });

    // ------------------------------------------------------
    // User
    // ------------------------------------------------------
    case ADD_USER_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case ADD_USER_SUCCESS:
      let users = state.users;
      if (users.findIndex(existingUser => existingUser.id === action.user.id) === -1) {
        users = [action.user, ...state.users];
      }
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        users: users
      });

    case EDIT_USER_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case EDIT_USER_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        users: state.users.map(existingUser =>
          existingUser.id === action.user.id ?
            action.user :
            existingUser
        )
      });

    case DELETE_USER_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case DELETE_USER_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        users: state.users.filter(existingUser =>
          existingUser.id !== action.user.id)
      });

    // ------------------------------------------------------
    // Event
    // ------------------------------------------------------
    case ADD_EVENT_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case ADD_EVENT_SUCCESS:
      let events = state.events;
      if (events.findIndex(evt => evt.id === action.event.id) === -1) {
        events = [action.event, ...state.events];
      }
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        events: events
      });

    case DELETE_EVENT_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case DELETE_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        events: state.events.filter(event =>
        event.id !== action.event.id)
      });

    case EDIT_EVENT_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case EDIT_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        events: state.events.map(event =>
          event.id === action.event.id ?
            action.event :
            event
        )
      });

    case ADD_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case EDIT_USER_FAILURE:
    case ADD_EVENT_FAILURE:
    case DELETE_EVENT_FAILURE:
    case EDIT_EVENT_FAILURE:
      return Object.assign({}, state, {
        isWorking: false,
        error: action.error,
      });

    default:
      return state;
  }
}
