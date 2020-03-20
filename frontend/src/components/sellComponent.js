import React from 'react';
import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap';


const SellItem = ({login,loginAction,loggedOutAction,user,ownProfileAction,userAddNewItemAction,mainAction}) => {
    

    
    const [titleOK, setTitleOk] = React.useState(false);
    const [descOK, setDescOk] = React.useState(false);
    const [priceOK, setPriceOk] = React.useState(false);

    var btn = document.getElementById('confirm');

    function checkTitle(e){
        if(e.target.value.length == 0){
            setTitleOk(false);
            btn.style.visibility = 'hidden';
        }else{
            setTitleOk(true)
            if(descOK == true && priceOK == true){
                btn.style.visibility = 'visible';
            }
        }
    }

    function checkDescription(e){
        if(e.target.value.length == 0){
            setDescOk(false)
            btn.style.visibility = 'hidden';
          
        }else{
            setDescOk(true)
            if(descOK == true && priceOK == true){
                btn.style.visibility = 'visible';
            }
        }  
    }

    function checkPrice(e){
        if(e.target.value.length != 0 && !isNaN(e.target.value)){
            setPriceOk(true)
        
            if(descOK == true && titleOK == true){
                btn.style.visibility = 'visible';
            }
          
        }else{
            setPriceOk(false);
            btn.style.visibility = 'hidden';
        }       
    }



    return (
        <div style={{
            display: "flex",
            margin: "70px",
            justifyContent: "center",
                alignItems: "center"
            }}>
        <Form>
         <FormGroup>
            <Label for="title">Title</Label>
            <Input valid={ titleOK === true } id="title" onChange={checkTitle} invalid={ titleOK === false }/>
            <FormFeedback invalid>Please fill in the title</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Description</Label>
            <Input type="textarea" onChange = {checkDescription} valid={ descOK === true } invalid={ descOK === false }/>
            <FormFeedback invalid>Please fill in the description</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Price</Label>
            <Input onChange = {checkPrice} name="price" id="price" valid={ priceOK === true } invalid={ priceOK === false } />
            <FormFeedback invalid>Give correct price</FormFeedback>
            </FormGroup>
            <Button style={{visibility:'hidden'}} id="confirm" block>Confirm</Button>
       
        </Form>
        </div>
      );
}




export default SellItem;