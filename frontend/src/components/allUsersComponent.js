import React from 'react';
import useFetch from "use-http";
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction
} from '../actions/actions.js';
import { QUEST, USER, SHOPKEEPER, ADMIN } from '../stateNames.js'


var user;
function setData(data){
  user = data;
}

function AllUsers({loadState, loadedAction, loadingAction, role, token}) {
  const authKey = token
  //const authKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNWU3MGVhOGU1M2VkN2YyMDc3YjljZDRlIiwiaWF0IjoxNTg0NDU4MzgyfQ.FCfdW5Piw2BuAGMmRDNB9QrBtcOStOwR_XxJQ5QCkPY"
  var obj = {
    method: 'GET',
    headers: {
      'authorization': 'Bearer ' + authKey
    }
  }
  //loadingAction();
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
  //var users = testUsers;
  //console.log(users);
  console.log(user);
  if (loadState=='LOADED') {
      var singleRoleArray = [];
      singleRoleArray = user.filter(usr => usr.role == ADMIN);
      singleRoleArray.map(usr => pushToArray(usr));

      singleRoleArray = user.filter(usr => usr.role == SHOPKEEPER);
      singleRoleArray.map(usr => pushToArray(usr));

      singleRoleArray = user.filter(usr => usr.role == USER);
      singleRoleArray.map(usr => pushToArray(usr));

  }
  else {
      usersToRender.push(
          <div>
              <p>Loading...</p>
          </div>)
  }
  return usersToRender

  function pushToArray(usr) {
    
    usersToRender.push(
      <div>
        <h3>{usr.name}</h3>
        <p>Role: {usr.role}</p>
        <p>Email: {usr.email}</p>
          {(() => {
            if (usr.address!='') {
              return <p>Adress: {usr.address}</p>;
            }
          })()}
        {(() => {
          if (usr.phoneNumber!='') {
            return <p>Phone number: {usr.phoneNumber}</p>;
          }
        })()}
        <hr/>
      </div>
    )
  }
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
