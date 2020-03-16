import {MAIN, LOGIN} from '../stateNames.js'

const initialState = {
  page: MAIN,
};

function pageReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN':
      return { ...state, page: LOGIN };
    case 'MAIN':
      return { ...state, page: MAIN };
    default:
      return state;
  }
}

export default pageReducer;
