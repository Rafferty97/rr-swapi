import {expect} from 'chai';
import {List, fromJS} from 'immutable';

import reducer from '../src/reducers/root';
import {startedFetching} from '../src/actions/actions';

describe('reducer', () => {

  /*it('handles STARTED_FETCHING', () => {

    const initialState = reducer(undefined, { type: 'NOOP' });

    expect(initialState).to.equal(fromJS({
      starships: {},
      planets: {},
      persons: {},
      isFetching: false
    }));

    const nextState = reducer(initialState, startedFetching());

    expect(nextState).to.equal(fromJS({
      starships: {},
      planets: {},
      persons: {},
      isFetching: true
    }));

  });*/

});
