import React from 'react';
import Header from '../containers/headerContainer.js';
//import Hdr from './containers/login.js';
import AllItems from './allItemsComponent.js'
import AllUsers from './allUsersComponent.js'
import Signup from '../containers/signupContainer.js';
import Login from '../containers/loginContainer.js';
import Profile from '../containers/profileContainer.js'
import Sell from '../containers/sellContainer.js';
import store from '../store/store.js';
import Receipts from '../containers/receiptContainer';
import Balance from '../containers/addBalanceContainer.js'
import {loadingAction} from '../actions/actions.js';

const App = ({page, mainAction, login}) => {
    store.dispatch(loadingAction());
    // This is for showing login form
    if (page === 'LOGIN' && login !== 'LOGGEDIN') {
        return (<div>
            <Header/>
            <Login/>
        </div>);

        // This is for showing signup form
    } else if (page === 'SIGNUP' && login !== 'LOGGEDIN') {
        return (<div>
            <Header/>
            <Signup/>
        </div>);
    } else if (page === 'OWNPROFILE' && login === 'LOGGEDIN') {

        return (<div>
            <Header/>
            <Profile/>
        </div>);

    } else if ((page === 'USERADDNEWITEM' || page === 'EDITITEM' || page === 'ADDFORSALE') && login === 'LOGGEDIN') {

        return (<div>
            <Header/>
            <Sell/>
        </div>);

    } else if (page === 'ALLUSERS' && login === 'LOGGEDIN') {

        return (<div>
            <Header/>
            <AllUsers/>
        </div>);

    } else if (page === 'USERSALES') {
        return (<div>
            <Header/>
            <Receipts/> {/* <AllUsers /> */}
        </div>);
    } else if (page === 'ADDBALANCE') {
        return (<div>
            <Header/>
            <Balance/> {/* <AllUsers /> */}
        </div>);
    } else {
        return (<div>
            <Header/>
            <AllItems/> {/* <AllUsers /> */}
        </div>);
    }

}

export default App;
