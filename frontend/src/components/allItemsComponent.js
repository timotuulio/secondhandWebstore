import React from 'react';
import useFetch from "use-http";
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction
} from '../actions/actions.js';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';


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
            <CardHeader>{itm.title}</CardHeader>
            <CardBody>
              {(() => {
                if (itm.description!='' && itm.description!='undefined') {
                  return <CardText>{itm.description}</CardText>;
                }
              })()}
              <CardText>Price: {itm.price}€</CardText>
              <Button onClick={buyItem()}>Buy</Button>
            </CardBody>
          </Card>
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

function buyItem() {
  console.log("Now I'll buy The Item!")
}

const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
