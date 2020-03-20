import {LOGGEDIN,LOGINFAILED,LOGGEDOUT,QUEST} from '../stateNames.js'

const initialState = {
  login: LOGGEDOUT,
  token: null,
  user: null,
  role: QUEST
};

function loginReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  console.log("asfsaf")
  switch(action.type) {
    case LOGGEDIN:
      console.log("changed state to success")
      return { ...state, login: LOGGEDIN,user:action.data.user, token: action.data.token, role: action.data.user.role};
    case LOGINFAILED:
      console.log("changed state to failed")
      return { ...state, login: LOGINFAILED};
    
    case LOGGEDOUT:
        console.log("logged out");
        return { ...state, login: LOGGEDOUT,user:null,token:null,role:QUEST};
    
    default:
      return state;
  }
}

export default loginReducer;
