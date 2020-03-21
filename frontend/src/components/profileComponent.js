import React from 'react';
import { Button, Form, FormGroup, Input,Card, CardHeader,CardBody,CardFooter } from 'reactstrap';

import store from '../store/store.js';

 // take over its submit event.
 let submit = (e) => {
    e.preventDefault();

    // Extract data from the form
    var name = document.getElementById('name').value;
    //var email = document.getElementById('email').value;
    //var pass = document.getElementById('password').value;
    var phone = document.getElementById('phoneNumber').value;
    var address = document.getElementById('address').value;
    var bank = document.getElementById('bankAccount').value;


    // Build body for the POST request
    var body  = JSON.stringify({"name":name,"phoneNumber":phone,"address":address,"bankAccount":bank});
    console.log(store.getState())
    // Use fetch to send the data
    // TODO: An if-system or something is needed so that when admin presses an user from all users -list he gets to the users profile and not to his own
    const url = "http://localhost:3001/api/user/"+store.getState().loginReducer.user._id;
    console.log(url);
    fetch(url, {
        method : "put",
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+store.getState().loginReducer.token},
        body: body
    }).then(
        response => response.text()
    ).then(
        html => console.log(html)
    );
  }


const Profile = ({login,loginSuccessAction, loginFailedAction,loggedOutAction,registerAction,user}) => {

//TODO: The input fields should have a disabled value and a button that allows changing the values
    return (
        <div style={{
            display: "flex",
            margin: "70px",
            justifyContent: "center",
                alignItems: "center"
            }}>
        <Form onSubmit={submit} style={{width:"70%"}}>
          <h2 className="display-4"  style={{textAlign:"center"}}>Edit profile</h2>
          <hr className="my-2" />
          <br/><br/>
          <Card className="text-center">
            <CardHeader>
            <h3 className="display-5">{user.email}</h3>

            </CardHeader>
              <CardBody>
              <FormGroup>Name:
              <Input type="text" name="name" id="name" placeholder="Name" defaultValue={user.name} />
            </FormGroup>
            <FormGroup>Bank account:
              <Input type="text" name="bankAccount" id="bankAccount" placeholder="Bank account" defaultValue={user.bankAccount} />
            </FormGroup>
            <FormGroup>Phone number:
              <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone number" defaultValue={user.phoneNumber} />
            </FormGroup>
            <FormGroup>Addresss:
              <Input type="text" name="address" id="address" placeholder="Address" defaultValue={user.address} />
            </FormGroup>

            Password:
            <FormGroup>
              <Input type="password" name="password" id="password1" placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="password2" placeholder="Password" />
            </FormGroup>

              </CardBody>
              <CardFooter>
              <Button color="primary" size="lg" >Save changes</Button>
              </CardFooter>
            </Card>
          </Form>

          </div>
      );
}


export default Profile;
