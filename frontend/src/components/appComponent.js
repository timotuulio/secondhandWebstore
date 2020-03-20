import React from 'react';
import Header from './headerComponent.js';
//import Hdr from './containers/login.js';
import AllItems from './allItemsComponent.js'
import AllUsers from './allUsersComponent.js'
import Signup from './signupComponent.js';
import Login from '../containers/loginContainer.js';
import Profile from '../containers/profileContainer.js'
import Sell from '../components/sellComponent.js';


const App = ({page,mainAction,login}) =>{

    // This is for showing login form
    if (page=='LOGIN' && login!='LOGGEDIN'){
        return(
            <div>
                <Header />
                <Login />
            </div>
        );

    // This is for showing signup form
    }else if(page=='SIGNUP' && login !='LOGGEDIN'){
        return(
            <div>
                <Header />
                <Signup />
            </div>
        );
    }else if(page=='OWNPROFILE' && login == 'LOGGEDIN'){

        return(
            <div>
                <Header />
                <Profile />
            </div>
        );



    }else if(page=='USERADDNEWITEM' && login == 'LOGGEDIN') {

        return(<div>
                <Header />
                <Sell />
                <div>Addnew item here</div>
            </div>);


    }else{
        return(
            <div>
                <Header />
                {/*<AllItems />*/}
                <AllUsers />
            </div>
        );
    }

}


export default App;
