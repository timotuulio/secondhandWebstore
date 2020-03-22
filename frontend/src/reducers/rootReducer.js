import pageReducer from './pageReducer.js';
import loadReducer from './loadReducer.js';
import loginReducer from './loginReducer.js';
import { combineReducers } from 'redux';

const ultimateReducer = combineReducers({
  pageReducer,
  loadReducer,
  loginReducer
});

export default ultimateReducer;
