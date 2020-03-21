import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input,Card, CardHeader,CardBody,CardFooter } from 'reactstrap';
import { USER, SHOPKEEPER, ADMIN } from '../stateNames.js'


const Signup = ({mainAction,loginSuccessAction}) => {

  // take over its submit event.
let submit = (e,data) => {
  e.preventDefault();

  // Extract data from the form
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
  var body  = JSON.stringify({"name":name,"email":email,"password":password,"phoneNumber":phoneNumber,"address":address,"role":role,"bankAccount":bankAccount});

  // Use fetch to send the data
  const url = "http://localhost:3001/api/user";
  fetch(url, {
      method : "post",
      headers: {'Content-Type': 'application/json'},
      body: body
  }).then(response => {

      // This is done in the case of successfull registration only
      if(response.status == '200'){
        response.text().then(html=> {
          loginSuccessAction(JSON.parse(html));
            mainAction();
        });

      // Put here how unsuccessfull registration is handled
      // Reasons might be missing required value
      }else if(response.status =='400'){

      
      // This will be the case of status 500 most of the time
      }else{
        response.text().then(res=> {
          
          if(JSON.parse(res).code == '11000'){
            console.log("duplicate email")
          }else{
            console.log("unknown error happened")
          }
          
        });
        
      }
     
    })
   
}




    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [radio, setRadio] = React.useState(false);
    
    const [nameOK, setNameOk] = React.useState(false);
    const [emailOK, setEmailOk] = React.useState(false);
    const [passwordOK, setPasswordOk] = React.useState(false);


    var btn = document.getElementById('register');

    function checkRadio(e){
      setRadio(true);
      if(nameOK && emailOK && passwordOK){
        btn.style.visibility = 'visible';
      }
    }

    function checkName(e){
        setName(e.target.value);
        if(e.target.value.length == 0){
            setNameOk(false);
            btn.style.visibility = 'hidden';
        }else{
            setNameOk(true)
            if(emailOK == true && passwordOK == true && radio==true){
                btn.style.visibility = 'visible';
            }
        }
    }

    function checkEmail(e){
        
        setEmail(e.target.value);
        var re = /\S+@\S+\.\S+/;
        
       

        if((re.test(e.target.value))){
            setEmailOk(false)
            btn.style.visibility = 'hidden';
          
        
        }else{
          setEmailOk(true)
          if(nameOK == true && passwordOK == true && radio==true){
              btn.style.visibility = 'visible';
          }
        }
           
        
    }

    function checkPassword(e){
        setPassword(e.target.value);
        if(e.target.value.length > 7){
            setPasswordOk(true)
        
            if(nameOK == true && emailOK == true && radio == true){
                btn.style.visibility = 'visible';
            }
          
        }else{
            setPasswordOk(false);
            btn.style.visibility = 'hidden';
        }       
    }

    




  return (
    <div style={{
      display: "flex",
      margin: "70px",
      justifyContent: "center",
          alignItems: "center"
      }}>
  <Form onSubmit={submit}>
    <h2 className="display-4">Registration</h2>
    <hr className="my-2" />
    <br/><br/>
    <Card className="text-center">

      <CardHeader></CardHeader>
        <CardBody>
        <FormGroup>
        <Input type="text" name="name" id="name" placeholder="Name" valid={ nameOK === true } id="title" onChange={checkName} invalid={ nameOK === false }/>
        <FormFeedback invalid>Name is required</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input type="email" name="email" id="email" placeholder="Email" valid={ emailOK === true } id="title" onChange={checkEmail} invalid={ emailOK === false } />
        <FormFeedback invalid>Email is required</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="password" placeholder="Password" valid={ passwordOK === true } id="title" onChange={checkPassword} invalid={ passwordOK === false } />
        <FormFeedback invalid>Password is required and needs to be at least 8 characters</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input type="text" name="bankAccount" id="bankAccount" placeholder="Bank account" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="address" id="address" placeholder="Address" />
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Role</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" onChange={checkRadio} id="r1" name="radio1" />{' '}
            User
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" onChange={checkRadio} id="r2" name="radio1" />{' '}
            Shopkeeper
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" onChange={checkRadio} id="r3" name="radio1"/>{' '}
            Admin
          </Label>
        </FormGroup>
        <Input style={{visibility:"hidden"}} type="password"  invalid={radio==false} valid={radio==true}/>
        <FormFeedback invalid >Role must be selected</FormFeedback>
      </FormGroup>
        </CardBody>
        <CardFooter>
        <Button id="register" color="primary" size="lg" onClick={submit}>Register</Button>
        </CardFooter>
      </Card>
    </Form>

    </div>
  );
}

export default Signup;
