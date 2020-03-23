import React from 'react';
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction
} from '../actions/actions.js';
import { Alert,Card, Button, CardHeader, CardBody, CardText } from 'reactstrap';
import { USER, SHOPKEEPER, ADMIN } from '../stateNames.js'


var user;
function setData(data){
  user = data;
}

function AllUsers({loadState, loadedAction, token,loadingAction}) {


  const [visible2, setVisible2] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  function alert2(){
      setVisible(true);
      window.setTimeout(()=>{
          setVisible(false)
        },3000)
     
  }
  function alert3(){
    setVisible2(true);
    window.setTimeout(()=>{
        setVisible2(false)
      },3000)
   
}


  const authKey = token
  //const authKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNWU3MGVhOGU1M2VkN2YyMDc3YjljZDRlIiwiaWF0IjoxNTg0NDU4MzgyfQ.FCfdW5Piw2BuAGMmRDNB9QrBtcOStOwR_XxJQ5QCkPY"
  var obj = {
    method: 'GET',
    headers: {
      'authorization': 'Bearer ' + authKey
    }
  }
  fetch('http://localhost:3001/api/user', obj).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

 


  function deleteUser(e){
    fetch('http://localhost:3001/api/user/'+e.target.value,
    {
      method: 'delete',
      headers: {
        'authorization': 'Bearer ' + token}}).then(res=>res.json()).then(data => loadingAction(),alert3());
  }


  var usersToRender = [];

  usersToRender.push(<Alert key="1" isOpen={visible2} color="success">
  <h5 className="alert-heading">Offer removed successfully!</h5>
</Alert>)

  //console.log(user);
  if (loadState==='LOADED') {
      var singleRoleArray = [];
      singleRoleArray = user.filter(usr => usr.role === ADMIN);
      singleRoleArray.map(usr => pushToArray(usr));

      singleRoleArray = user.filter(usr => usr.role === SHOPKEEPER);
      singleRoleArray.map(usr => pushToArray(usr));

      singleRoleArray = user.filter(usr => usr.role === USER);
      singleRoleArray.map(usr => pushToArray(usr));

  }
  else {
      usersToRender.push(
          <div key="2">
              <p>Loading...</p>
          </div>)
  }
  return usersToRender
// TODO: Button is not yet connected to the users profile
  function pushToArray(usr) {

    usersToRender.push(
      <div  key={usr['_id']} style={{
        display: "flex",
        margin: "15px",
        justifyContent: "center",
            alignItems: "center",
        width:"100%"
        }}>
        <Card style={{
          maxWidth:"500px",
          minWidth:"30em",
          marginBottom:"5px",
          alignSelf:"center"
        }}>
          <CardHeader>{usr.name} </CardHeader>
          <CardBody>
            <CardText>Role: {usr.role}</CardText>
            <CardText>{usr.email}</CardText>
            {(() => {
              if (usr.address!==undefined && usr.address!=='undefined') {
                return <CardText>Address: {usr.address}</CardText>;
              }
            })()}
            {(() => {
              if (usr.phoneNumber!==undefined && usr.phoneNumber!=='undefined') {
                console.log("--------" + usr.phoneNumber)
                return <CardText>Phonenumber: {usr.phoneNumber}</CardText>;
              }
            })()}
            <div>
            <div><Button color="primary" onClick={goToProfile()}>Got to profile</Button></div>
            <br/>
            <Button color="primary" onClick={deleteUser} value={usr['_id']}>Delete user</Button>
            </div>
           
           
          </CardBody>
        </Card>
      </div>
    )
  }
}

function goToProfile() {
  //console.log("This is useless")
  //alert("Lol");
}

const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState,
    role: state.loginReducer.role,
    token: state.loginReducer.token
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
