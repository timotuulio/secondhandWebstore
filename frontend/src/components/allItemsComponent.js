import React from 'react';
import useFetch from "use-http";
import { connect } from 'react-redux';
import {
  incrementAction,
  decreaseAction,
  loadedAction,
  mainAction,
  loadingAction
} from '../actions/actions.js';


var item;
function setData(data){
  item = data;
}

function AllItems({loadState, loadedAction, loadingAction}) {

  //loadingAction();
  fetch('http://localhost:3001/api/item').then(res=>res.json()).then(data => setData(data)).then(loadedAction);

  const testItems = [
    {
        "_id": "5e6d1dd29339230cc6f8076c",
        "price": 1,
        "title": "A Blääg",
        "__v": 0
    },
    {
        "_id": "5e6d34d4f5b37b0ecc4821ac",
        "price": 1290,
        "title": "A secret JOeebix",
        "__v": 0
    }
  ];
  const itemsToRender = /*testItems*/[];
  var items = testItems;
  console.log(items);
  if (loadState=='LOADED') {

      item.map(itm => itemsToRender.push(
        <div>
        <h3>{itm.title}</h3>
        <div>{itm.price}€</div>
        <hr/>
      </div>
      ))

  }
  else {
    itemsToRender.push(
      <div>
        <p>Loading...</p>
      </div>)
  }
  return itemsToRender
}


const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState
  });

const mapDispatchToProps = (dispatch) => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
    mainAction: () => dispatch(mainAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
