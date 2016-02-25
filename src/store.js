import { createStore } from 'redux';

import { app } from './reducers/app.js';

export default function makeStore()
{
  return createStore(app);
}
