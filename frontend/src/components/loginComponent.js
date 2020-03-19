
import React from 'react';

import store from '../store/store.js'
import { Input, InputGroup, Card, CardHeader,CardBody, CardTitle,CardText,CardFooter, Button } from 'reactstrap';

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
            //alert("EIPÄ OLLU")

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
    <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',  
    }}>
     
        <h2 className="display-4">Sisäänkirjautuminen</h2>
            <hr className="my-2" />
            <br/><br/>
        
            <form id="login" onSubmit={submit}>
                <div style={{width:"100%"}}>    
                    <Card className="text-center">
                        
                        <CardHeader></CardHeader>
                        <CardBody>
                            <InputGroup>
                                <Input type="text" id="email" placeholder="Sähköposti" />
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <Input type="password" id="password" placeholder="Salasana" />
                            </InputGroup>
                            <br></br>
                            
                        </CardBody>
                        <CardFooter>
                        <Button color="primary" size="lg" >Kirjaudu sisään</Button>
                        </CardFooter>
                     
                    </Card>
                </div>
            </form>
            {(() => {
                if (login=='LOGINFAILED') {
                return <div >Sähköpostiosoite tai salasana väärin</div> ;
                }
                })()}
            <br/><br/>
            <hr className="my-2" />
            <p>{login}</p>
            <p>Ei vielä tunnusta? Luo uusi tunnus tästä.</p>
    </div>
  )


export default Login;