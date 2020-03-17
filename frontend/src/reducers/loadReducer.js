import {LOADING, LOADED} from '../stateNames.js'

const initialState = {
  loadState: LOADING,
};

function loadReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOADING':
      return { loadState: LOADING };
    case 'LOADED':
      console.log("changed state to main")
      return { loadState: LOADED };
    default:
      return state;
  }
}

export default loadReducer;
