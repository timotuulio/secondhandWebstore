import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input,Card,CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { USER, SHOPKEEPER, ADMIN } from '../stateNames.js'


const Signup = ({mainAction,loginSuccessAction},props) => {

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

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
  var body  = JSON.stringify({"name":name,"email":email,"password":password,"phoneNumber":phoneNumber,"address":address,"role":role,"bankAccount":bank});

  // Use fetch to send the data
  const url = "http://localhost:3001/api/user";
  fetch(url, {
      method : "post",
      headers: {'Content-Type': 'application/json'},
      body: body
  }).then(response => {
      console.log(response.status)
      // This is done in the case of successfull registration only
      if(response.status === 200){
        response.text().then(html=> {
          mainAction();
          loginSuccessAction(JSON.parse(html),toggle);
            
        });

      // Put here how unsuccessfull registration is handled
      // Reasons might be missing required value
      }else if(response.status ==='400'){

      
      // This will be the case of status 500 most of the time
      }else{
        response.text().then(res=> {
          console.log(res)
          if(JSON.parse(res).code === '11000'){
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
    const [bank, setBank] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    
    const [nameOK, setNameOk] = React.useState(false);
    const [emailOK, setEmailOk] = React.useState(false);
    const [passwordOK, setPasswordOk] = React.useState(false);



    function checkRadio(e){
      setRadio(true);
      if(nameOK && emailOK && passwordOK){
        document.getElementById('register').style.visibility = 'visible';
      }
    }

    function checkName(e){
        setName(e.target.value);
        if(e.target.value.length === 0){
            setNameOk(false);
            document.getElementById('register').style.visibility = 'hidden';
        }else{
            setNameOk(true)
            if(emailOK === true && passwordOK === true && radio===true){
              document.getElementById('register').style.visibility = 'visible';
            }
        }
    }

    function checkEmail(e){
        
        setEmail(e.target.value);
        var re = /\S+@\S+\.\S+/;
        
       

        if(!(re.test(e.target.value))){
            setEmailOk(false)
            document.getElementById('register').style.visibility = 'hidden';
          
        
        }else{
          setEmailOk(true)
          if(nameOK === true && passwordOK === true && radio===true){
            document.getElementById('register').style.visibility = 'visible';
          }
        }
           
        
    }

    function checkPassword(e){
        setPassword(e.target.value);
        if(e.target.value.length > 7){
            setPasswordOk(true)
        
            if(nameOK === true && emailOK === true && radio === true){
              document.getElementById('register').style.visibility = 'visible';
            }
          
        }else{
            setPasswordOk(false);
            document.getElementById('register').style.visibility = 'hidden';
        }       
    }


    function checkBank(e){
      setBank(e.target.value);
    }

    function checkPhone(e){
      setPhone(e.target.value);
    }
    function checkAddress(e){
      setAddress(e.target.value);
    }
    




  return (
    <div style={{
      display: "flex",
      margin: "70px",
      justifyContent: "center",
          alignItems: "center"
      }}>
  <Form id = "signup">
    <h2 className="display-4">Registration</h2>
    <hr className="my-2" />
    <br/><br/>
    <Card className="text-center">
        <CardBody>
        <FormGroup>
        <Input autoComplete="new-password" type="text" name="name" id="name" placeholder="Name" valid={ nameOK === true } onChange={checkName} invalid={ nameOK === false }/>
        <FormFeedback invalid="true">Name is required</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input autoComplete="new-password" type="email" name="email" id="email" placeholder="Email" valid={ emailOK === true } onChange={checkEmail} invalid={ emailOK === false } />
        <FormFeedback invalid="true">Email is required</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input autoComplete="new-password" type="password" name="password" id="password" placeholder="Password" valid={ passwordOK === true } onChange={checkPassword} invalid={ passwordOK === false } />
        <FormFeedback invalid="true">Password is required and needs to be at least 8 characters</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input type="text" name="bankAccount" onChange={checkBank} id="bankAccount" placeholder="Bank account" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="phoneNumber" onChange={checkPhone} id="phoneNumber" placeholder="Phone number" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="address" onChange={checkAddress} id="address" placeholder="Address" />
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
        <Input style={{visibility:"hidden"}} type="password"  invalid={radio===false} valid={radio===true}/>
        <FormFeedback invalid="true">Role must be selected</FormFeedback>
      </FormGroup>
      <Button block style={{visibility:"hidden"}} id="register" color="primary" size="lg" onClick={toggle}>Register</Button>
      
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Cofirm registration</ModalHeader>
            <ModalBody>
              <div>Name: {name}</div>
              <div>Email: {email}</div>
              <div>Bank account: {bank}</div>
              <div>Phone number: {phone}</div>
              <div>Address: {address}</div>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={submit}>Confirm registration</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </CardBody>

  
      </Card>
    </Form>

    </div>
  );
}

export default Signup;
