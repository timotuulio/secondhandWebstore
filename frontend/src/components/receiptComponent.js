import React from 'react';
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction,
  editItemAction,
  receiptAction
} from '../actions/actions.js';
import { Card, Button, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';

var receipts;
    function setData(data){
        receipts = data;
    }


function Receipts({loadState, loadedAction, loadingAction,page,user,token,editItemAction}) {

    


    fetch('http://localhost:3001/api/receipt/'+user['_id']).then(res=>res.json()).then(data => setData(data)).then(loadedAction);

    const receiptsToRender =[];

    if (loadState==='LOADED') {

    receipts.map(itm => receiptsToRender.push(

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
        <CardHeader>Title: {itm.title}</CardHeader>
            
            <CardBody>
              <CardText>Amount: {itm.amount} €</CardText>
    

            </CardBody>
            <CardFooter>
            {itm.seller === user['_id'] ? 'SOLD TO STORE' : 'BOUGHT FROM STORE' }
            </CardFooter>
          </Card>
        </div>
      ))




}else{
    receiptsToRender.push(
    <div key="none">
      <div>Loading...</div>
    </div>)
}

return  (<div><div> <h2 className="display-4"  >Receipts</h2>
<hr className="my-2" /></div><div>{receiptsToRender}</div></div>)

}

//export default Receipts;




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
    editItemAction: (data) => dispatch(editItemAction(data)),

});


export default connect(mapStateToProps, mapDispatchToProps)(Receipts);