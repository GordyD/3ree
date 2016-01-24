/* global describe */
/* global it */
/* global afterEach */

import 'babel-polyfill'; // For use of Object.assign

import sinon from 'sinon';
import chai from 'chai';

var expect = chai.expect;

import reducer from '../universal/reducers';
import * as actions from '../universal/actions/PulseActions.js';

describe('Reducers', () => {

  /**
   * Example of writing a test on a reducing functiom
   */
  describe('setUserId', () => {
    it('should set user id', () => {
      let initialStateForTest = { userId: null };
      let userId = 234;
      let action = actions.setUserId(userId);

      expect(initialStateForTest.userId).to.be.null

      let state = reducer(initialStateForTest, action);
      expect(state.userId).to.equal(userId);
    });
  });

  describe('addEvent', () => {
    describe('request', () => {
      it('should set isWorking to true', () => {
        let initialStateForTest = { isWorking: false };
        let action = actions.addEventRequest();

        expect(initialStateForTest.isWorking).to.be.false

        let state = reducer(initialStateForTest, action);
        expect(state.isWorking).to.be.true;
      });
    });

    describe('success', () => {
      it('should set isWorking to false and add event to events', () => {
        let events = [
          { id: 22, name: 'Entry', value: 20 }
        ];
        let initialStateForTest = { isWorking: true, events: events };
        let event = { id: 25, name: 'Another Entry', value: 50 };

        let action = actions.addEventSuccess(event);

        expect(initialStateForTest.isWorking).to.be.true
        expect(initialStateForTest.events.length).to.equal(events.length);


        let state = reducer(initialStateForTest, action);
        expect(state.isWorking).to.be.false;
        expect(state.events.length).to.equal(events.length + 1);
      });
    });

    describe('failure', () => {
      it('should set isWorking to false and error and not change events', () => {
        let events = [
          { id: 22, name: 'Entry', value: 20 }
        ];
        let initialStateForTest = { isWorking: true, events: events, error: null };
        let error = 'some error';

        let action = actions.addEventFailure(error);

        expect(initialStateForTest.isWorking).to.be.true
        expect(initialStateForTest.error).to.be.null
        expect(initialStateForTest.events.length).to.equal(events.length);


        let state = reducer(initialStateForTest, action);
        expect(state.isWorking).to.be.false;
        expect(state.error).to.equal(error);
        expect(state.events.length).to.equal(events.length);
      });
    });
  });
});