import React from 'react';
import { Alert,Button, Form, FormGroup, Input,Card, CardHeader,CardBody,CardFooter } from 'reactstrap';
import { ownProfileAction } from '../actions/actions';




function Balance({user,token,updateProfileAction,ownProfileAction}){

    

    function addFunds(){
        var funds = document.getElementById('funds').value;
        const url = "http://localhost:3001/api/user/"+user['_id'];
        console.log(url);
        fetch(url, {
            method : "put",
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+token},
            body: JSON.stringify({balance:funds})
        }).then(
            response => response.text()).then(res => updateProfileAction(JSON.parse(res))).then(ownProfileAction)
    }
   //updateProfileAction(JSON.parse(res),ownProfileAction()
    function tst(f1,f2){
        f1();
        f2();
    }


    if(user.bankAccount){
        return <div style={{
            display: "flex",
            margin: "70px",
            justifyContent: "center",
                alignItems: "center"
            }}><div><h2 className="display-4"  style={{textAlign:"center"}}>Add balance</h2>
            <hr className="my-2" />Account: {user.bankAccount}<Input id="funds" type ="number" placeholder="Amount in euros"></Input><Button onClick={addFunds} color="primary">Transfer funds</Button></div>
           </div>
              


    }else{
        return <div style={{
            display: "flex",
            margin: "70px",
            justifyContent: "center",
                alignItems: "center"
            }}><div><h2 className="display-4"  style={{textAlign:"center"}}>Add balance</h2>
            <hr className="my-2" /><Alert color="danger">ADD YOUR BANK INFORMATION</Alert></div>
           </div>
    }

    
}



export default Balance;