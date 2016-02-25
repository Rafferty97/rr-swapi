import {
  DISCOVERED_STARSHIPS, DISCOVERED_PLANETS, DISCOVERED_PERSONS,
  LOAD_STARSHIP, LOAD_PLANET, LOAD_PERSON
} from './constants';

export const discoverPersons = (persons) => {
  return {
    type: DISCOVERED_PERSONS,
    persons: persons
  };
};

export const loadStarship = (id, data) => {
  return {
    type: LOAD_STARSHIP,
    id: id,
    data: data
  };
};

export const loadPlanet = (id, data) => {
  return {
    type: LOAD_PLANET,
    id: id,
    data: data
  };
};

export const loadPerson = (id, data) => {
  return {
    type: LOAD_PERSON,
    id: id,
    data: data
  };
};
