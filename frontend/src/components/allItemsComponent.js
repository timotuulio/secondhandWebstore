import React from 'react';
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction,
  editItemAction
} from '../actions/actions.js';
import { Card, Button, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';


var item;
function setData(data){
  item = data;
}

function AllItems({loadState, loadedAction, loadingAction,page,user,token,editItemAction}) {



  function deleteItem(e){
    
    fetch('http://localhost:3001/api/item/'+e.target.value,
    {
      method: 'delete',
      headers: {
        'authorization': 'Bearer ' + token}}).then(res=>res.json()).then(data => loadingAction());
  }

/*
  function getUserName(ID){
    var user =fetch('http://localhost:3001/api/user/'+ID,
  {
    method: 'get',
    headers: {
      'authorization': 'Bearer ' + token}}).then(res=>res.json()).then(data =>  data.name).then(result => result);
    
    return JSON.stringify(user);
  }

  

  const getUserName = (ID) => fetch('http://localhost:3001/api/user/'+ID,
  {
    method: 'get',
    headers: {
      'authorization': 'Bearer ' + token}}).then(res=>res.json()).then(data => JSON.stringify(data));
*/

  var currentPath;
  

  if(page==='OWNSELLABLES'){
    currentPath = "items/offered/"+user['_id'];
  }else if(page==='MAIN'){
    currentPath = "item";
  }else if(page === 'OFFERS'){
    currentPath = "items/offers";
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
  if (loadState==='LOADED') {

      item.map(itm => itemsToRender.push(

        <div key={itm._id} style={{
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
          }} >

            {(() => {
                if (page==='OWNSELLABLES') {
                  return <CardHeader>{itm.title}</CardHeader>
                }else{
                  return <CardHeader>{itm.title}<Button color="primary" style={{float: 'right'}} onClick = {mainAction}>Seller</Button></CardHeader>

                }
              })()}


            
            <CardBody>
              {(() => {
                if (itm.description!=='' && itm.description!=='undefined') {
                  return <CardText>{itm.description}</CardText>;
                }
              })()}
              <CardText>Price: {itm.price}€</CardText>
              <CardText>Created: {itm.created}</CardText>
              

            </CardBody>
            <CardFooter>
            {(() => {
                if (page==='OWNSELLABLES') {
                  return <div><Button color="primary" value={itm._id} onClick={deleteItem}>Remove</Button>
                  <Button color="primary" style={{float: 'right'}} onClick={() => editItemAction(itm)}>Edit</Button></div>
                }else{
                  return <div><Button color="primary" value={itm._id} onClick={buyItem()}>Buy</Button>
                  </div>
                }
              })()}

            </CardFooter>
          </Card>
        </div>
      ))

     
              
  }
  else {
    itemsToRender.push(
      <div key="none">
        <div>Loading...</div>
      </div>)
  }
  if (page==='OWNSELLABLES') {
    return  (<div> <h2 className="display-4">Own sellables</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }else if(page==='MAIN'){
    return  (<div> <h2 className="display-4">Shop goods</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }else{
    return  (<div> <h2 className="display-4">Offers</h2>
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
    editItemAction: (data) => dispatch(editItemAction(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
