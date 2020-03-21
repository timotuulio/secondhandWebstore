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

function AllItems({loadState, loadedAction, loadingAction,page,user,token}) {



  function deleteItem(e){
    
    fetch('http://localhost:3001/api/item/'+e.target.value,
    {
      method: 'delete',
      headers: {
        'authorization': 'Bearer ' + token}}).then(res=>res.json()).then(data => loadingAction());
  }






  var currentPath;
  

  if(page=='OWNSELLABLES'){
    currentPath = "items/offered/"+user['_id'];
  }else if(page=='MAIN'){
    currentPath = "item";
  }


  //loadingAction();
  fetch('http://localhost:3001/api/'+currentPath).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

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
              {(() => {
                if (page=='OWNSELLABLES') {
                  return <Button value={itm._id} onClick={deleteItem}>Remove</Button>
                }else{
                  return <Button value={itm._id} onClick={buyItem()}>Buy</Button>
                }
              })()}

              
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
  if (page=='OWNSELLABLES') {
    return  (<div> <h2 className="display-4">Own sellables</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }else{
    return  (<div> <h2 className="display-4">Shop goods</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }
  
  
 
}

function buyItem() {
  console.log("Now I'll buy The Item!")
}

const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState,
    user: state.loginReducer.user,
    token: state.loginReducer.token,
    page: state.pageReducer.page
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
