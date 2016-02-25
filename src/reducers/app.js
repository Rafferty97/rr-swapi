import {
  DISCOVERED_PERSONS,
  LOAD_PERSON
} from '../actions/constants';

import { Map } from 'immutable';

const initialState = Map({
  starships: Map(),
  planets: Map(),
  persons: Map(),
  isFetching: false
});

export const app = (state, action) => {
  if (typeof state === 'undefined') {
    state = initialState;
  }

  if (action.type == DISCOVERED_PERSONS) {
    return state.update('persons', (persons) => {
      let ns = persons;
      action.persons.forEach((person, i) => {
        if (ns.has(person.id)) return;
        ns = ns.set(person.id, {
          name: person.name,
          loaded: false
        });
      });
      return ns;
    });
  }
  if (action.type == LOAD_PERSON) {
    let data = Object.assign(action.data, { loaded: true });
    let ns = state.setIn(['persons', action.id], data);
    return ns;
  }

  return state;
};
