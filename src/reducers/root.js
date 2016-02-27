import {
  LOAD_ENTITY, STARTED_FETCHING, FINISHED_FETCHING, FETCHED_PAGE
} from '../actions/actions';

import { Map } from 'immutable';

const initialState = Map({
  starships: Map(),
  planets: Map(),
  people: Map(),
  cache: Map({
    isFetching: false,
    starships: 1,
    planets: 1,
    people: 1
  })
});

const handleCache = (state, action) => {
  if (action.type == STARTED_FETCHING) {
    return state.setIn(['cache', 'isFetching'], true);
  }
  if (action.type == FINISHED_FETCHING) {
    return state.setIn(['cache', 'isFetching'], false);
  }
  if (action.type == FETCHED_PAGE) {
    return state.setIn(['cache', action.entity], action.nextPage);
  }
  return state;
};

/* ROOT REDUCER */

export default (state, action) => {
  if (typeof state === 'undefined') {
    state = initialState;
  }

  state = handleCache(state, action);

  if (action.type == LOAD_ENTITY) {
    let data = Object.assign(action.data, { loaded: true });
    let ns = state.setIn([action.entityType, action.id], data);
    return ns;
  }

  return state;
};
