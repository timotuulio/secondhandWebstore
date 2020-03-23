// Actions for Redux part of the page
import { LOADING, LOADED } from "./actionTypes";
import { MAIN, ALLITEMS, SINGLEITEM, LOGIN, SIGNIN, OWNPROFILE, OWNSELLABLES, USERADDNEWITEM, ALLSELLABLES, SHOPKEEPERBUYITEM, ALLUSERS, USERSALES } from "./actionTypes";
import { QUEST, USER, SHOPKEEPER, ADMIN } from "./actionTypes";
import {LOGINFAILED,LOGGEDIN, LOGGEDOUT, SIGNUP,ALLOFFERS, EDITITEM, STOCK, ADDFORSALE,UPDATEDATA} from "./actionTypes";

export function mainAction() {return{type: MAIN,};}
export function allItemsAction() {return{type: ALLITEMS,};}
export function singleItemAction() {return{type: SINGLEITEM,};}
export function loginAction() {return{type: LOGIN,};}
export function signinAction() {return{type: SIGNIN,};}
export function ownProfileAction() {return{type: OWNPROFILE,};}
export function ownSellablesAction() {return{type: OWNSELLABLES,};}
export function userAddNewItemAction() {return{type: USERADDNEWITEM,};}
export function allSellablesAction() {return{type: ALLSELLABLES,};}
export function shopkeeperBuyAction() {return{type: SHOPKEEPERBUYITEM,};}
export function allUsersAction() {return{type: ALLUSERS,};}
export function addForSaleAction(item) {return{type: ADDFORSALE, data:item};}



export function salesAction() {return{type: USERSALES,};}

export function offersAction() {return{type: ALLOFFERS,};};
export function editItemAction(item) {return{type: EDITITEM, data:item};};
export function stockAction() {return{type: STOCK}}

export function questAction() {return{type: QUEST,};}
export function userAction() {return{type: USER,};}
export function shopkeeperAction() {return{type: SHOPKEEPER,};}
export function adminAction() {return{type: ADMIN,};}

export function loadingAction() {return{type: LOADING};};
export function loadedAction() {return{type: LOADED};};

export function loginFailedAction() {return{type: LOGINFAILED};};
export function loginSuccessAction(userData) {return{type: LOGGEDIN,data:userData};};
export function loggedOutAction() {return{type: LOGGEDOUT};};

export function registerAction() {return{type: SIGNUP};};



export function updateProfileAction(user) {console.log("updateprofile");console.log(user);return {type:UPDATEDATA, data:user}}