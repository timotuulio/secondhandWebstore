import React from 'react';
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction,
  editItemAction,
  stockAction,
  addForSaleAction
} from '../actions/actions.js';
import { Alert,Card, Button, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';
//import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var item;
function setData(data){
    item = data;
}


function AllItems({login, loadState, loadedAction, loadingAction,page,user,token,editItemAction,addForSaleAction},props) {

/*
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);
*/

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



  function deleteItem(e){

    fetch('http://localhost:3001/api/item/'+e.target.value,
    {
      method: 'delete',
      headers: {
        'authorization': 'Bearer ' + token}}).then(res=>res.json()).then(data => loadingAction(),alert3());
  }


  function buyItem(e) {
    alert2();
    //alert(e.target.value);
    fetch('http://localhost:3001/api/buy/'+e.target.value,
    {
      method: 'post',
      headers: {
        'Content-type':'application/json','authorization': 'Bearer ' + token},
      body: JSON.stringify({"itemID":e.target.value, "buyerID": user['_id']})}
      ).then(() => loadingAction());


  }




  var currentPath;


  if(page==='OWNSELLABLES'){
    currentPath = "items/offered/"+user['_id'];
  }else if(page==='MAIN'){
    currentPath = "items/sales";
  }else if(page === 'OFFERS'){
    currentPath = "items/offers";
  }else if(page ==='STOCK'){
    currentPath = "items/stock";
  }else{
    currentPath = "items/sales";
  }

    if(page === 'OWNSELLABLES' || page ==='OFFERS' || page==='STOCK'){
      fetch('http://localhost:3001/api/'+currentPath,{headers: {'Content-type':'application/json','Authorization': 'Bearer '+token}}).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

    }else{
      fetch('http://localhost:3001/api/'+currentPath).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

    }



  const itemsToRender =[<div key={33} style={{
    display: "flex",
    margin: "15px",
    justifyContent: "center",
        alignItems: "center",
    width:"100%"
    }}><Alert isOpen={visible} color="success">
  <h5 className="alert-heading">Item bought successfully!</h5>
</Alert><Alert isOpen={visible2} color="success">
  <h5 className="alert-heading">Offer removed successfully!</h5>
</Alert></div>];

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
                if (page==='OWNSELLABLES' || page ==='MAIN') {
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
                }else if (page === 'STOCK'){
                  return <div><Button color="primary" onClick={() => addForSaleAction(itm)}>Add to sales</Button></div>
                }else if(login==='LOGGEDIN'){
                  return <div><Button color="primary" value={itm._id} onClick={buyItem}>Buy</Button>
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

/*
  itemsToRender.push( <Modal isOpen={modal} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle}>Confirm payment</ModalHeader>
    <ModalBody>
  <div>Title: {itemname}</div>
  <div>Description: {itemDesc}</div>
  <div>Price: {itemPrice} €</div>
    </ModalBody>
    <ModalFooter>

      <Button color="primary" onClick={() => buyItem(itemID)}>Confirm</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>);

*/



  if (page==='OWNSELLABLES') {
    return  (<div><div> <h2 className="display-4"  >Own sellables</h2>
    <hr className="my-2" /></div><div>{itemsToRender}</div></div>)
  }else if(page==='MAIN'){
    return  (<div> <h2 className="display-4">Shop goods</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }else if(page ==='STOCK'){
    return  (<div> <h2 className="display-4">Stock</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }else{
    return  (<div><h2 className="display-4">Offers</h2>
    <hr className="my-2" /><div>{itemsToRender}</div></div>)
  }
}



const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState,
    user: state.loginReducer.user,
    token: state.loginReducer.token,
    page: state.pageReducer.page,
    login: state.loginReducer.login
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    addForSaleAction: (data) => dispatch(addForSaleAction(data)),
    stockAction: () => dispatch(stockAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
    editItemAction: (data) => dispatch(editItemAction(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
