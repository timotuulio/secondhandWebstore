<<<<<<< HEAD
import {MAIN, ALLITEMS, SINGLEITEM, LOGIN, SIGNIN, OWNPROFILE, OWNSELLABLES, USERADDNEWITEM, ALLSELLABLES, SHOPKEEPERBUYITEM, ALLUSERS, SIGNUP,ALLOFFERS,EDITITEM,STOCK, USERSALES} from '../stateNames.js'
=======
import {MAIN, ALLITEMS, SINGLEITEM, LOGIN, SIGNIN, OWNPROFILE, OWNSELLABLES, USERADDNEWITEM, ALLSELLABLES, SHOPKEEPERBUYITEM, ALLUSERS, SIGNUP,ALLOFFERS,EDITITEM,STOCK,ADDFORSALE} from '../stateNames.js'
>>>>>>> 6aeda5386c3a8c1448975b354d0e825d648bc381

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
<<<<<<< HEAD
      return {page: STOCK};
    case 'USERSALES':
      return {page: USERSALES}
=======
      return {...state, page: STOCK};
    case 'ADDFORSALE':
      return {...state, page: ADDFORSALE, item:action.data};
>>>>>>> 6aeda5386c3a8c1448975b354d0e825d648bc381
    default:
      return state;
  }
}

export default pageReducer;
