import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers/root';
import swapi from './middleware/swapi';

const createStoreWithMiddleware = applyMiddleware(
  swapi
)(createStore);

export default function makeStore()
{
  return createStoreWithMiddleware(reducer);
}
