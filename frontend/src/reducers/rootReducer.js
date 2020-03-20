import pageReducer from './pageReducer.js';
import loadReducer from './loadReducer.js';
import userReducer from './userReducer.js';
import loginReducer from './loginReducer.js';
import { combineReducers } from 'redux';

const ultimateReducer = combineReducers({
  pageReducer,
  loadReducer,
  userReducer,
  loginReducer
});

export default ultimateReducer;
