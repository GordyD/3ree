/* global chai */
/* global sinon */
/* global describe */
/* global it */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../universal/actions/PulseActions.js';
import * as types from '../universal/constants/ActionTypes';

describe('PulseActions', () => {
  const mockStore = configureStore([thunk]);

  /**
   * Example of writing a test on a syncronous action creator
   */
  describe('setUserId', () => {
    it('should return action with type SET_USER_ID and userId equal to 200', () => {
      var action = actions.setUserId(200);
      expect(action.type).to.equal(types.SET_USER_ID);
      expect(action.userId).to.equal(200);
    });

    it('should return action with type SET_USER_ID and userId equal to 6700102', () => {
      var action = actions.setUserId(6700102);
      expect(action.type).to.equal(types.SET_USER_ID);
      expect(action.userId).to.equal(6700102);
    });
  });

  /**
   * Example of writing a test on an asyncronous action creator
   */
  describe('loadEvents', () => {
    it('should run', () => {
      let user = { id: 27 };
      let api = {
        user: {
          signup: sinon.stub().callsArgWith(1, null, 'success!'),
          get: sinon.stub().callsArgWith(0, null, user)
        }
      };

      let expectedActions = [
        { type: 'SIGNUP_REQUEST' },
        { type: 'SIGNUP_SUCCESS', payload: { user: { id: 27 } } }
      ];
      let store = mockStore(initialState, expectedActions, done);

      store.dispatch(actions.async.signup(api, {foo: 'bar'}));

      expect(api.user.signup.callCount).to.equal(1);
      expect(api.user.get.callCount).to.equal(1);
    });
  });
});