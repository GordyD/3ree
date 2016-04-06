import {
  LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE,
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
  EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE,
  SET_USER_ID
} from '../constants/ActionTypes';

const initialState = {
  isWorking: false,
  userId: null,
  error: null,
  events: []
};

export default function pulses(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.userId
      });
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
