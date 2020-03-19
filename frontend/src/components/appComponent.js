import React from 'react';
import Header from './headerComponent.js';
//import Hdr from './containers/login.js';
import AllItems from './allItemsComponent.js'
import AllUsers from './allUsersComponent.js'
import Test from './test.js'
import Signup from './signupComponent.js';
import Login from '../containers/loginContainer.js';


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
    }else{
        return(
            <div>
                <Header />
                {/*<AllItems />*/}
                <Test />
                <AllUsers />
            </div>
        );
    }

}


export default App;
