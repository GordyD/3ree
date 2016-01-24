/* global describe */
/* global it */
/* global afterEach */

import sinon from 'sinon';
import chai from 'chai';

var expect = chai.expect;

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../universal/actions/PulseActions.js';
import * as types from '../universal/constants/ActionTypes';

describe('Actions', () => {
  afterEach(function() {
    actions.__ResetDependency__('request');
  });

  /**
   * Example of writing a test on a syncronous action creator
   */
  describe('setUserId', () => {
    it('should return action with type SET_USER_ID and userId equal to 200', () => {
      let action = actions.setUserId(200);
      expect(action.type).to.equal(types.SET_USER_ID);
      expect(action.userId).to.equal(200);
    });

    it('should return action with type SET_USER_ID and userId equal to 6700102', () => {
      let action = actions.setUserId(6700102);
      expect(action.type).to.equal(types.SET_USER_ID);
      expect(action.userId).to.equal(6700102);
    });
  });

  /**
   * Example of writing a test on an asyncronous action creator
   */
  describe('loadEvents', () => {
    const mockStore = configureStore([thunk]);
    it('should trigger a LOAD_EVENTS_REQUEST and LOAD_EVENTS_SUCCESS action when succesful', (done) => {
      let requestMock = {
        get: () => ({
          set: () => ({
            end: (x) => x(null, {
              body: [ { name: 'Awesome', value: 54 } ]
            })
          })
        })
      };

      actions.__Rewire__('request', requestMock);

      let expectedActions = [
        { type: 'LOAD_EVENTS_REQUEST' },
        { type: 'LOAD_EVENTS_SUCCESS', events: [ { name: 'Awesome', value: 54 } ] }
      ];
      
      let initialState = {pulseApp: { events: [], userId: 'baseUser'} };
      let store = mockStore(initialState, expectedActions, done);

      store.dispatch(actions.loadEvents());
    });

    it('should trigger a LOAD_EVENTS_REQUEST and LOAD_EVENTS_FAILURE action when unsuccessful', (done) => {
      let error = 'An Error Occurred!';
      let requestMock = {
        get: () => ({
          set: () => ({
            end: (x) => x(error)
          })
        })
      };

      actions.__Rewire__('request', requestMock);

      let expectedActions = [
        { type: 'LOAD_EVENTS_REQUEST' },
        { type: 'LOAD_EVENTS_FAILURE', error: error }
      ];
      
      let initialState = {pulseApp: { events: [], userId: 'baseUser'} };
      let store = mockStore(initialState, expectedActions, done);

      store.dispatch(actions.loadEvents());
    });
  });
});