import {MAIN, ALLITEMS, SINGLEITEM, LOGIN, SIGNIN, OWNPROFILE, OWNSELLABLES, USERADDNEWITEM, ALLSELLABLES, SHOPKEEPERBUYITEM, ALLUSERS, SIGNUP} from '../stateNames.js'

const initialState = {
  page: MAIN,
};

function pageReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  switch(action.type) {
    case 'LOGIN':
      console.log("changed state to login")
      return { ...state, page: LOGIN };
    case 'MAIN':
      console.log("changed state to main")
      return { ...state, page: MAIN };
    case 'ALLITEMS':
      console.log("changed state to all items")
      return { ...state, page: ALLITEMS };
    case 'SINGLEITEM':
      console.log("changed state to single item")
      return { ...state, page: SINGLEITEM };
    case 'SIGNIN':
      console.log("changed state to sign in")
      return { ...state, page: SIGNIN };
    case 'OWNPROFILE':
      console.log("changed state to own profile")
      return { ...state, page: OWNPROFILE };
    case 'OWNSELLABLES':
      console.log("changed state to own sellable items")
      return { ...state, page: OWNSELLABLES };
    case 'USERADDNEWITEM':
      console.log("changed state to user adding a new item")
      return { ...state, page: USERADDNEWITEM };
    case 'ALLSELLABLES':
      console.log("changed state to all sellables")
      return { ...state, page: ALLSELLABLES };
    case 'SHOPKEEPERBUYITEM':
      console.log("changed state to shopkeeper buying an item")
      return { ...state, page: SHOPKEEPERBUYITEM };
    case 'ALLUSERS':
      console.log("changed state to all users")
      return { ...state, page: ALLUSERS };
    case 'SIGNUP':
      console.log("page changed to signup");
      return {...state, page: SIGNUP };
    default:
      return state;
  }
}

export default pageReducer;
