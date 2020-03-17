import {QUEST, USER, SHOPKEEPER, ADMIN} from '../stateNames.js'

const initialState = {
  role: QUEST
};

function userReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  switch(action.type) {
    case 'QUEST':
      console.log("changed state to QUEST")
      return { ...state, role: QUEST };
    case 'USER':
      console.log("changed state to USER")
      return { ...state, role: USER };
    case 'SHOPKEEPER':
      console.log("changed state to SHOPKEEPER")
      return { ...state, role: SHOPKEEPER };
    case 'ADMIN':
      console.log("changed state to ADMIN")
      return { ...state, role: ADMIN };
    default:
      return state;
  }
}

export default userReducer;
