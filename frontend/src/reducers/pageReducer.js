import {MAIN, ALLITEMS, SINGLEITEM, LOGIN, SIGNIN, OWNPROFILE, OWNSELLABLES, USERADDNEWITEM, ALLSELLABLES, SHOPKEEPERBUYITEM, ALLUSERS, SIGNUP,ALLOFFERS,EDITITEM,STOCK,ADDFORSALE} from '../stateNames.js'

const initialState = {
  page: MAIN,
};

function pageReducer(state = initialState, action) {
  //TODO: Remove needless "...state" if possible
  switch(action.type) {
    case 'LOGIN':
      return { ...state, page: LOGIN };
    case 'MAIN':
      return { ...state, page: MAIN };
    case 'ALLITEMS':
      return { ...state, page: ALLITEMS };
    case 'SINGLEITEM':
      return { ...state, page: SINGLEITEM };
    case 'SIGNIN':
      return { ...state, page: SIGNIN };
    case 'OWNPROFILE':
      return { ...state, page: OWNPROFILE };
    case 'OWNSELLABLES':
      return { ...state, page: OWNSELLABLES };
    case 'USERADDNEWITEM':
      return { ...state, page: USERADDNEWITEM };
    case 'ALLSELLABLES':
      return { ...state, page: ALLSELLABLES };
    case 'SHOPKEEPERBUYITEM':
      return { ...state, page: SHOPKEEPERBUYITEM };
    case 'ALLUSERS':
      return { ...state, page: ALLUSERS };
    case 'SIGNUP':
      return {...state, page: SIGNUP };
    case 'ALLOFFERS':
      return {...state, page: ALLOFFERS};
    case 'EDITITEM':
      return {...state, page: EDITITEM, item:action.data};
    case 'STOCK':
      return {...state, page: STOCK};
    case 'ADDFORSALE':
      return {...state, page: ADDFORSALE, item:action.data};
    default:
      return state;
  }
}

export default pageReducer;
