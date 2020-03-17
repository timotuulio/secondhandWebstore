import React from 'react';
import useFetch from "use-http";
import { connect } from 'react-redux';
import {
  incrementAction,
  decreaseAction,
  loadedAction,
  mainAction
} from '../actions/actions.js';

function AllItems({loadState, loadedAction}) {
  async function fetchData() {
      const res = await fetch('http://localhost:3001/api/item');

      res
          .json()
          .then(res => {
            asd(res)
            // res.map(itm => {
            //   return itemsToRender.push(
            //     <div>
            //       <h3>{itm.title}</h3>
            //       <p>{itm.price}€</p>
            //       <hr/>
            //     </div>)
            // });
            // console.log("This is itemsToRender: " + itemsToRender);
          });

  }
  function asd(res) {
    //console.log("I am in asd!");
    //console.log(res);
    loadedAction();
  }
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
  const itemsToRender = testItems/*[]*/;
  const items = fetchData();
  console.log(items);
  if (loadState=='LOADED') {
    console.log("...................." +items);
      return itemsToRender.push(
        <div>
          <h3>{items.title}</h3>
          <p>{items.price}€</p>
          <hr/>
        </div>)
  }
  else {
  //if (loadState=='LOADING') {
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
});


export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
