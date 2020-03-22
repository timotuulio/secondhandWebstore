import React from 'react';
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction
} from '../actions/actions.js';
import { Card, Button, CardHeader, CardBody, CardText } from 'reactstrap';
import { USER, SHOPKEEPER, ADMIN } from '../stateNames.js'


var user;
function setData(data){
  user = data;
}

function AllUsers({loadState, loadedAction}) {
  //const authKey = token
  const authKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNWU3MGVhOGU1M2VkN2YyMDc3YjljZDRlIiwiaWF0IjoxNTg0NDU4MzgyfQ.FCfdW5Piw2BuAGMmRDNB9QrBtcOStOwR_XxJQ5QCkPY"
  var obj = {
    method: 'GET',
    headers: {
      'authorization': 'Bearer ' + authKey
    }
  }
  fetch('http://localhost:3001/api/user', obj).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

  /*const testUsers = [
    {
        "_id": "5e6d1dd29339230cc6f8076c",
        "name": "1",
        "password": "A Blääg",
        "__v": 0
    },
    {
        "_id": "5e6d34d4f5b37b0ecc4821ac",
        "name": "1290",
        "password": "A secret JOeebix",
        "__v": 0
    }
  ];*/
  var usersToRender = /*testUsers*/[];

  console.log(user);
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
          <div>
              <p>Loading...</p>
          </div>)
  }
  return usersToRender
// TODO: Button is not yet connected to the users profile
  function pushToArray(usr) {

    usersToRender.push(
      <div style={{
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
          <CardHeader>{usr.name}</CardHeader>
          <CardBody>
            <CardText>Role: {usr.role}</CardText>
            <CardText>{usr.email}</CardText>
            {(() => {
              if (usr.address!=='' && usr.address!=='undefined') {
                return <CardText>Address: {usr.address}</CardText>;
              }
            })()}
            {(() => {
              if (usr.phoneNumber!=='' && usr.phoneNumber!=='undefined') {
                return <CardText>Phonenumber: {usr.phoneNumber}</CardText>;
              }
            })()}
            <Button onClick={goToProfile()}>Got to profile</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function goToProfile() {
  console.log("This is useless")
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
