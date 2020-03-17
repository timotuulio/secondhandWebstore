import {QUEST, USER, SHOPKEEPER, ADMIN} from '../stateNames.js'

const initialState = {
  page: QUEST
};

function userReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  switch(action.type) {
    case 'QUEST':
      console.log("changed state to QUEST")
      return { ...state, page: QUEST };
    case 'USER':
      console.log("changed state to USER")
      return { ...state, page: USER };
    case 'SHOPKEEPER':
      console.log("changed state to SHOPKEEPER")
      return { ...state, page: SHOPKEEPER };
    case 'ADMIN':
      console.log("changed state to ADMIN")
      return { ...state, page: ADMIN };
    default:
      return state;
  }
}

export default userReducer;
