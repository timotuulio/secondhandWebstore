import {MAIN, ALLITEMS, SINGLEITEM, LOGIN, SIGNIN, OWNPROFILE, OWNSELLABLES, USERADDNEWITEM, ALLSELLABLES, SHOPKEEPERBUYITEM, ALLUSERS, SIGNUP,ALLOFFERS,EDITITEM,STOCK, USERSALES} from '../stateNames.js'

const initialState = {
  page: MAIN,
};

function pageReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  switch(action.type) {
    case 'LOGIN':
      return {page: LOGIN };
    case 'MAIN':
      return {page: MAIN };
    case 'ALLITEMS':
      return {page: ALLITEMS };
    case 'SINGLEITEM':
      return {page: SINGLEITEM };
    case 'SIGNIN':
      return {page: SIGNIN };
    case 'OWNPROFILE':
      return {page: OWNPROFILE };
    case 'OWNSELLABLES':
      return {page: OWNSELLABLES };
    case 'USERADDNEWITEM':
      return {page: USERADDNEWITEM };
    case 'ALLSELLABLES':
      return {page: ALLSELLABLES };
    case 'SHOPKEEPERBUYITEM':
      return {page: SHOPKEEPERBUYITEM };
    case 'ALLUSERS':
      return {page: ALLUSERS };
    case 'SIGNUP':
      return {page: SIGNUP };
    case 'ALLOFFERS':
      return {page: ALLOFFERS};
    case 'EDITITEM':
      return {page: EDITITEM, item:action.data};
    case 'STOCK':
      return {page: STOCK};
    case 'USERSALES':
      return {page: USERSALES}
    default:
      return state;
  }
}

export default pageReducer;
