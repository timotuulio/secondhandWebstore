import React from 'react';

import store from '../store/store.js'
import {
    Alert,
    Input,
    InputGroup,
    Card,
    CardBody,
    Button
} from 'reactstrap';

import {mainAction, loginFailedAction, loginSuccessAction} from '../actions/actions.js';

// take over its submit event.
let submit = (e, data) => {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var pass = document.getElementById('password').value;

    var string = email + ':' + pass;

    var encoded = window.btoa(string);

    const XHR = new XMLHttpRequest();

    XHR.open('POST', 'http://localhost:3001/api/login');
    XHR.setRequestHeader('Authorization', 'Basic ' + encoded);

    XHR.send();

    // Define what happens on successful data submission
    XHR.addEventListener("load", function(event) {

        var response = event.target.responseText;
        //console.log(response)

        // Tähän toiminta kun unauthorized
        if (response === 'Unauthorized') {
            // TODO: That's just funny so I'll leave it that way for now
            //alert("EIPÄ OLLU")
            store.dispatch(loginFailedAction());
        } else {
            store.dispatch(mainAction());
            store.dispatch(loginSuccessAction(JSON.parse(response)));
            // This will show the main page

        }
        // Set token and role to state

        //var JSONtoken = event.target.responseText;
        //JSONtoken = JSONtoken.replace(/["']/g, "");

        //hardcoded = JSONtoken;

        //store.dispatch(saveToken(JSONtoken));
        //alert( event.target.responseText );
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {
        alert('Oops! Something went wrong.');
    });
}

const Login = ({login, loginSuccessAction, loginFailedAction, loggedOutAction, registerAction}) => {

    return (<div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>

        <h2 className="display-4">Log in</h2>
        <hr className="my-2"/>
        <br/><br/>

        <form id="login" onSubmit={submit}>
            <div style={{
                    width: "100%"
                }}>
                <Alert isOpen={login === 'LOGINFAILED'} color="danger">
                    Wrong email and/or password!
                </Alert>

                <Card className="text-center">

                    <CardBody>
                        <InputGroup>
                            <Input type="text" id="email" placeholder="Email"/>
                        </InputGroup>
                        <br></br>
                        <InputGroup>
                            <Input type="password" id="password" placeholder="Password"/>
                        </InputGroup>
                        <br></br>

                        <Button block color="primary" size="lg">Log in</Button>
                    </CardBody>

                </Card>

            </div>
        </form>
        <br/><br/>
        <hr className="my-2"/>
        <div>Not signed in yet? Create a new user
            <Button onClick={registerAction}>Here</Button>
        </div>
    </div>)
}

export default Login;
