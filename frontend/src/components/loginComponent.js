
import React from 'react';

import store from '../store/store.js'

import {
    incrementAction,
    decreaseAction,
    mainAction,
    loginFailedAction,
    loginSuccessAction,
    loggedOutAction
  } from '../actions/actions.js';

    
  // take over its submit event.
let submit = (e,data) => {
    e.preventDefault();


    var email=document.getElementById('email').value;
    var pass=document.getElementById('password').value;
    
    
    var string  = email+':'+pass;

    var encoded = window.btoa(string);


    const XHR = new XMLHttpRequest();

    XHR.open('POST','http://localhost:3001/api/login');
    XHR.setRequestHeader('Authorization','Basic '+encoded);
    
    XHR.send();

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {

        var response = event.target.responseText;
        console.log(response)
        

        // Tähän toiminta kun unauthorized
        if(response == 'Unauthorized'){
            alert("EIPÄ OLLU")

            store.dispatch(loginFailedAction());
            //store.dispatch(incrementAction);
        }else{
            store.dispatch(loginSuccessAction());
        }
        // Set token and role to state

        //var JSONtoken = event.target.responseText;
      //JSONtoken = JSONtoken.replace(/["']/g, "");


      
      //hardcoded = JSONtoken;
    
      //store.dispatch(saveToken(JSONtoken));
      //alert( event.target.responseText );
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      alert( 'Oops! Something went wrong.' );
    } );
}



const Login = ({login,loginSuccessAction, loginFailedAction,loggedOutAction}) => (
    <div>
        <form id="login" onSubmit={submit}>
            <label for="fname">Email address:</label>
            <input type="text" id="email" name="email"/>
            <br></br>
            <label for="lname">Password:</label>
            <input type="password" id="password" name="password"/>
            <br></br>
            <input type="submit" value="Submit"/>
        </form>
        <div>{login}</div>
        {(() => {
            if (login=='LOGINFAILED') {
            return <div >Kasdsadt</div> ;
            }
            })()}
        <p>Not signed up? Sign up here!</p>
    </div>
  )


export default Login;