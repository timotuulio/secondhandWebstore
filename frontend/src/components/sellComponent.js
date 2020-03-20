import React from 'react';
import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import store from '../store/store.js';



 
 

const SellItem = (props,{login,loginAction,loggedOutAction,user,ownProfileAction,userAddNewItemAction,mainAction}) => {



    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = React.useState(false);
      const toggle = () => setModal(!modal);
    // take over its submit event.
 let submit = (e) => {
    e.preventDefault();
  
    // Extract data from the form

    var title= document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
  

  
    // Build body for the POST request
    var body  = JSON.stringify({"title":title,"description":description,"price":price,"ownerId":store.getState().loginReducer.user['_id']});
  
    // Use fetch to send the data
    const url = "http://localhost:3001/api/item";
    fetch(url, {
        method : "post",
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+store.getState().loginReducer.token},
        body: body
    }).then(response => response.text()).then(html=> toggle());
  }
  

   

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(0);
    
    const [titleOK, setTitleOk] = React.useState(false);
    const [descOK, setDescOk] = React.useState(false);
    const [priceOK, setPriceOk] = React.useState(false);

    var btn = document.getElementById('confirm');

    function checkTitle(e){
        setTitle(e.target.value);
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
        setDescription(e.target.value);
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
        setPrice(e.target.value);
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
        <Form onSubmit={submit}>
         <FormGroup>
            <Label for="title">Title</Label>
            <Input valid={ titleOK === true } id="title" onChange={checkTitle} invalid={ titleOK === false }/>
            <FormFeedback invalid>Please fill in the title</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Description</Label>
            <Input id="description" type="textarea" onChange = {checkDescription} valid={ descOK === true } invalid={ descOK === false }/>
            <FormFeedback invalid>Please fill in the description</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Price</Label>
            <Input id="price" onChange = {checkPrice} name="price" id="price" valid={ priceOK === true } invalid={ priceOK === false } />
            <FormFeedback invalid>Give correct price</FormFeedback>
            </FormGroup>

                <div>
                <Button style={{visibility:'hidden'}} onClick={toggle} id="confirm" block>Confirm</Button>
              
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Confirm sale</ModalHeader>
                    <ModalBody>
                    <div>{title}</div>
                    <div>{description}</div>
                    <div>{price}</div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={submit}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            
       
        </Form>
        </div>
      );
}

//<Button color="danger" onClick={toggle}>{buttonLabel}</Button>


export default SellItem;