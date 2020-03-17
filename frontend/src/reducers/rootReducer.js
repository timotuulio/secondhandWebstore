import pageReducer from './pageReducer.js';
import loadReducer from './loadReducer.js';
import userReducer from './userReducer.js';
import { combineReducers } from 'redux';

//const {combineReducers} = Redux;

const initialState = {
  value: 0,
};

function addReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREASE':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

const ultimateReducer = combineReducers({
  addReducer,
  pageReducer,
  loadReducer,
  userReducer
});

export default ultimateReducer;
