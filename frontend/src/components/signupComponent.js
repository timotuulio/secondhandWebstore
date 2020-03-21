import React from 'react';
import { Button, Form, FormGroup, Label, Input,Card, CardHeader,CardBody,CardFooter } from 'reactstrap';
import { USER, SHOPKEEPER, ADMIN } from '../stateNames.js'


const Signup = ({mainAction,loginSuccessAction}) => {

  // take over its submit event.
let submit = (e,data) => {
  e.preventDefault();

  // Extract data from the form
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var address = document.getElementById('address').value;
  var bankAccount = document.getElementById('bankAccount').value;


  var role;

  if(document.getElementById('r1').checked){
    role = USER;
  }else if(document.getElementById('r2').checked){
    role = SHOPKEEPER;
  }else if(document.getElementById('r3').checked){
    role = ADMIN;
  }

  // Build body for the POST request
  var body  = JSON.stringify({"name":name,"email":email,"password":pass,"phoneNumber":phoneNumber,"address":address,"role":role,"bankAccount":bankAccount});

  // Use fetch to send the data
  const url = "http://localhost:3001/api/user";
  fetch(url, {
      method : "post",
      headers: {'Content-Type': 'application/json'},
      body: body
  }).then(response => response.text()).then(html=> loginSuccessAction(JSON.parse(html)),mainAction());
}




  return (
    <div style={{
      display: "flex",
      margin: "70px",
      justifyContent: "center",
          alignItems: "center"
      }}>
  <Form onSubmit={submit}>
    <h2 className="display-4">Rekisteröityminen</h2>
    <hr className="my-2" />
    <br/><br/>
    <Card className="text-center">

      <CardHeader></CardHeader>
        <CardBody>
        <FormGroup>
        <Input type="text" name="name" id="name" placeholder="Nimi" />
      </FormGroup>
      <FormGroup>
        <Input type="email" name="email" id="email" placeholder="Sähköposti" />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="password" placeholder="Salasana" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="bankAccount" id="bankAccount" placeholder="Tilinumero" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Puhelinnumero" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="address" id="address" placeholder="Osoite" />
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Rooli</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" id="r1" name="radio1" />{' '}
            Käyttäjä
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" id="r2" name="radio1" />{' '}
            Kauppias
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" id="r3" name="radio1"/>{' '}
            Ylläpitäjä
          </Label>
        </FormGroup>
      </FormGroup>
        </CardBody>
        <CardFooter>
        <Button color="primary" size="lg" onClick={submit}>Rekisteröidy</Button>
        </CardFooter>
      </Card>
    </Form>

    </div>
  );
}

export default Signup;
