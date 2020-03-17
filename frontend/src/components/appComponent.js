import React from 'react';
import Header from './headerComponent.js';
//import Hdr from './containers/login.js';
import AllItems from './allItemsComponent.js'
import Test from './test.js'
import Signup from './signupComponent.js';
import Login from './loginComponent.js';


const App = ({page,mainAction}) =>{

    if (page=='MAIN'){
        return(
            <div>
                <Header />
                <Login />
            </div>
        );
        
    }else{
        return(
            <div>
                <Header />
                <AllItems />
                <Test />
                <Signup />
            </div>
        );
    }
    
}


export default App;