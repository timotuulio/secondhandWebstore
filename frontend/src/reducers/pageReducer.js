import {MAIN, LOGIN} from '../stateNames.js'

const initialState = {
  page: LOGIN,
};

function pageReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN':
      return { ...state, page: LOGIN };
    case 'MAIN':
      console.log("changed state to main")
      return { ...state, page: MAIN };
    default:
      return state;
  }
}

export default pageReducer;
