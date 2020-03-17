import React from 'react';
import useFetch from "use-http";
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction
} from '../actions/actions.js';


var user;
function setData(data){
  user = data;
}

function AllUsers({loadState, loadedAction, loadingAction}) {
  // TODO: Authkey needs to be in a state and come from logging in or out
  const authKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNWU3MGVhOGU1M2VkN2YyMDc3YjljZDRlIiwiaWF0IjoxNTg0NDU4MzgyfQ.FCfdW5Piw2BuAGMmRDNB9QrBtcOStOwR_XxJQ5QCkPY"
  var obj = {
    method: 'GET',
    headers: {
      'authorization': 'Bearer ' + authKey
    }
  }
  //loadingAction();
  fetch('http://localhost:3001/api/user', obj).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

  const testUsers = [
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
  ];
  const usersToRender = /*testUsers*/[];
  var users = testUsers;
  //console.log(users);
  console.log(user);
  if (loadState=='LOADED') {

      user.map(usr => usersToRender.push(
        <div>
        <h3>{usr.name}</h3>
        <div>{usr.password}€</div>
        <hr/>
      </div>
      ))

  }
  else {
    usersToRender.push(
      <div>
        <p>Loading...</p>
      </div>)
  }
  return usersToRender
}


const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
