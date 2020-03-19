import {LOGGEDIN,LOGINFAILED,LOGGEDOUT} from '../stateNames.js'

const initialState = {
  login: LOGGEDOUT
};

function loginReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  console.log("asfsaf")
  switch(action.type) {
    case LOGGEDIN:
      console.log("changed state to success")
      return { ...state, login: LOGGEDIN };
    case LOGINFAILED:
      console.log("changed state to failed")
      return { ...state, login: LOGINFAILED };
    
    case LOGGEDOUT:
        console.log("logged out");
        return { ...state, login: LOGGEDOUT};
    
    default:
      return state;
  }
}

export default loginReducer;
