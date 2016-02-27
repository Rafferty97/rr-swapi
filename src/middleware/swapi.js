require('es6-promise').polyfill();
require('isomorphic-fetch');

import {
  NEW_QUERY, FETCHED_PAGE,

  newQuery, loadEntity,
  startedFetching, finishedFetching, fetchedPage
} from '../actions/actions';

function fetchPages(dispatch, type, firstPage)
{
  let hasNext = false;
  fetch('//swapi.co/api/'+type+'?page='+firstPage)
    .then(response => {
      // todo: error handling
      return response.json();
    })
    .then(json => {
      let entities = json.results.forEach(entity => {
        dispatch(loadEntity(entity.url, type, entity));
      });
      hasNext = json.next !== null;
    }).
    then(() => {
      dispatch(fetchedPage(type, firstPage, hasNext));
      if (!hasNext) {
        dispatch(finishedFetching());
      } else {
        fetchPages(dispatch, type, firstPage+1);
      }
    });
}

function startFetchingEntityIfNeeded(entity, dispatch, state)
{
  if (state.getIn(['cache', 'isFetching']))
    return;
  let firstPage = state.getIn(['cache', entity]);
  if (firstPage == -1)
    return;
  dispatch(startedFetching());
  fetchPages(dispatch, entity, firstPage);
}

function startFetchingIfNeeded(dispatch, state)
{
  ['starships', 'planets', 'people'].forEach(type => {
    startFetchingEntityIfNeeded(type, dispatch, state);
  });
}

export default store => next => action => {
  if (action.type == NEW_QUERY) {
    let query = action.query;
    startFetchingIfNeeded(store.dispatch, store.getState(), query);
  } else return next(action);
};
