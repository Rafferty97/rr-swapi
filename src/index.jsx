import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';

import makeStore from './store';

import SearchPage from './views/SearchPage';
import PersonPage from './views/PersonPage';

let store = makeStore();

import { loadPerson, discoverPersons } from './actions/actions.js';

store.dispatch(loadPerson(1, {
  name: 'Luke Skywalker',
  weight: '75kg'
}));
store.dispatch(loadPerson(2, {
  name: 'Amy Winehouse',
  weight: '52kg'
}));
store.dispatch(loadPerson(3, {
  name: 'Albert Einstein',
  weight: '90kg'
}));
store.dispatch(discoverPersons([
  { id: 4, name: 'Alexander Rafferty' },
  { id: 5, name: 'Jack Scott' }
]));

window.addPerson = (id, name) => {
  store.dispatch(loadPerson(id, { name }));
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={SearchPage} />
      <Route path="/person" component={PersonPage} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
