import { createStore, compose } from 'redux';
import Axios from 'axios';
import rootReducer from './ducks';

//const baseurl('http://localhost:3004');
//Axios.get('/todos');

const devCompose =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default createStore(rootReducer, devCompose());
