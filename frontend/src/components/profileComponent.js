import React from 'react';
import { Alert,Button, Form, FormGroup, Input,Card, CardHeader,CardBody,CardFooter } from 'reactstrap';
import { loggedOutAction, addBalanceAction } from '../actions/actions';



const Profile = ({mainAction,token,user, updateProfileAction,loggedOutAction,addBalanceAction}) => {


  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [radio, setRadio] = React.useState(false);
  
  const [nameOK, setNameOk] = React.useState(false);
  const [emailOK, setEmailOk] = React.useState(false);
  const [passwordOK, setPasswordOk] = React.useState(false);




  const [visible, setVisible] = React.useState(false)
  function alert2(){
      setVisible(true);
      window.setTimeout(()=>{
          setVisible(false)
        },3000)
     
  }


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
  
  // Use fetch to send the data
  // TODO: An if-system or something is needed so that when admin presses an user from all users -list he gets to the users profile and not to his own
  const url = "http://localhost:3001/api/user/"+user['_id'];
  console.log(url);
  fetch(url, {
      method : "put",
      headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+token},
      body: body
  }).then(
      response => response.text()).then(res => updateProfileAction(JSON.parse(res),alert2()))
  
}

function removeAccount(){
 
  const deleteurl = "http://localhost:3001/api/user/"+user['_id'];
  
  fetch(deleteurl, {
      method : "delete",
      headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+token},
  }).then(
      response => response.text()).then(res => mainAction(),loggedOutAction())
}





//TODO: The input fields should have a disabled value and a button that allows changing the values
    return (
        <div style={{
            display: "flex",
            margin: "70px",
            justifyContent: "center",
                alignItems: "center"
            }}>
              
        <Form style={{width:"70%"}}>
          <h2 className="display-4"  style={{textAlign:"center"}}>Edit profile</h2>
          <hr className="my-2" />
         
          <br/><br/>
          <Card className="text-center">
            <CardHeader>
          <h3 className="display-5">{user.email} / Balance: {user.balance} €</h3><Button onClick={addBalanceAction} color="primary">Add balance</Button>
            
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
              
                <div>
              <div><Button color="primary" size="lg" onClick={submit}>Save changes</Button></div><br/><br/>
              <Button float="right" color="primary" size="lg" onClick={removeAccount}>Remove account</Button>
              </div>
              
             
            </Card>
           
            <Alert isOpen={visible} color="success">
  <h5 className="alert-heading">Data saved successfully!</h5>
</Alert>
          </Form>
         
          
          </div>
      );
}


export default Profile;
