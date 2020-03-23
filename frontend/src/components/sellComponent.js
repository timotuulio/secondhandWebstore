import React from 'react';
import { FormText,Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { SALE } from '../constants.js';


const SellItem = ({user,token,page,item,mainAction,ownSellablesAction},props) => {

    // This produces null for the button reference??
    //var btn = document.getElementById('confirm');


    const [title, setTitle] = React.useState(item ? item.title : "");
    const [description, setDescription] = React.useState(item ? item.description : "");
    const [price, setPrice] = React.useState(item ? item.price :0);

    const [titleOK, setTitleOk] = React.useState(item ? true : false);
    const [descOK, setDescOk] = React.useState(item ? true : false);
    const [priceOK, setPriceOk] = React.useState(item ? true : false);

  

    const {
        className
      } = props;

      const [modal, setModal] = React.useState(false);
      const toggle = () => setModal(!modal);
      
      // take over its submit event.
    let submitNew = (e) => {
        e.preventDefault();

        // Extract data from the form

        var title= document.getElementById('title').value;
        var description = document.getElementById('description').value;
        var price = document.getElementById('price').value;


        var date = new Date();
        // Build body for the POST request
        var body  = JSON.stringify({"title":title,"description":description,"price":price,"ownerId":user['_id'],"created":date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear(),"status":"offered"});


        var formData = new FormData();
        var image = document.getElementById('file').files[0];
        //console.log(image)

        formData.append("body",body);
        formData.append("image",image);

        // Use fetch to send the data
        const url = "http://localhost:3001/api/item";
        fetch(url, {
            method : "post",
            headers: {'Content-type':'application/json','Authorization': 'Bearer '+token},

        body: body
    }).then(response => response.text()).then(html=> combineActions(ownSellablesAction,toggle))

  }

  // This is for getting the modal closed without freezing
function combineActions(action1,action2){
    action1();
    action2();
  }

  let submitChanges = (e) => {

     // Build body for the put request
        var body  = JSON.stringify({"title":title,"description":description,"price":price});



      const url = "http://localhost:3001/api/item/"+item._id;
      fetch(url, {
        method : "put",
        headers: {'Content-type':'application/json','Authorization': 'Bearer '+token},

        body: body
    }).then(response => response.text()).then(html=> combineActions(ownSellablesAction,toggle))
  }

  let addForSale = (e) => {

      // Build body for the put request
      var body  = JSON.stringify({"title":title,"description":description,"price":price,"status":SALE});

  
      const url = "http://localhost:3001/api/item/"+item._id;
      fetch(url, {
        method : "put",
        headers: {'Content-type':'application/json','Authorization': 'Bearer '+token},

        body: body
      }).then(response => response.text()).then(html=> combineActions(mainAction,toggle));
  }







    function checkTitle(e){
        setTitle(e.target.value);
        if(e.target.value.length === 0){
            setTitleOk(false);
            document.getElementById('confirm').style.visibility = 'hidden';
        }else{
            setTitleOk(true)
            if(descOK === true && priceOK === true){
                document.getElementById('confirm').style.visibility = 'visible';
            }
        }
    }

    function checkDescription(e){
        setDescription(e.target.value);
        if(e.target.value.length === 0){
            setDescOk(false)
            document.getElementById('confirm').style.visibility = 'hidden';

        }else{
            setDescOk(true)
            if(descOK === true && priceOK === true){
                document.getElementById('confirm').style.visibility = 'visible';
            }
        }
    }

    function checkPrice(e){
        setPrice(e.target.value);
        if(e.target.value.length !== 0 && !isNaN(e.target.value)){
            setPriceOk(true)

            if(descOK === true && titleOK === true){
                document.getElementById('confirm').style.visibility = 'visible';
            }

        }else{
            setPriceOk(false);
            document.getElementById('confirm').style.visibility = 'hidden';
        }
    }



    return (
        <div style={{
            display: "flex",
            margin: "70px",
            justifyContent: "center",
                alignItems: "center"
            }}>

        <Form >
        {(() => {
              if(page === 'EDITITEM') {
                return ( <div><h2 className="display-4">Edit offer</h2>
                <hr className="my-2" /></div>)
              }else if (page==='ADDFORSALE'){
                return ( <div><h2 className="display-4">Add to sales</h2>
                <hr className="my-2" /></div>)
              }else{
                return ( <div><h2 className="display-4">Make a new offer</h2>
                <hr className="my-2" /></div>)
              }
            })()}


            {(() => {
              if(page === 'EDITITEM' || page === 'ADDFORSALE') {
                return (<div>
                    <FormGroup>
                    <Label for="title">Title</Label>
                    <Input valid={ titleOK === true } id="title" onChange={checkTitle} invalid={ titleOK === false} defaultValue={item.title}/>
                    <FormFeedback invalid="true">Please fill in the title</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Description</Label>
                    <Input id="description" type="textarea" onChange = {checkDescription} valid={ descOK === true } invalid={ descOK === false } defaultValue={item.description}/>
                    <FormFeedback invalid="true">Please fill in the description</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Price</Label>
                    <Input onChange = {checkPrice} name="price" id="price" valid={ priceOK === true } invalid={ priceOK === false } defaultValue={item.price}/>
                    <FormFeedback invalid="true">Give correct price</FormFeedback>
                    </FormGroup>
                    </div>
                )
              }else{
                return (<div>
                    <FormGroup>
                    <Label for="title">Title</Label>
                    <Input valid={ titleOK === true } id="title" onChange={checkTitle} invalid={ titleOK === false }/>
                    <FormFeedback invalid="true">Please fill in the title</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Description</Label>
                    <Input id="description" type="textarea" onChange = {checkDescription} valid={ descOK === true } invalid={ descOK === false }/>
                    <FormFeedback invalid="true">Please fill in the description</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Price</Label>
                    <Input onChange = {checkPrice} name="price" id="price" valid={ priceOK === true } invalid={ priceOK === false } />
                    <FormFeedback invalid="true">Give correct price</FormFeedback>
                    </FormGroup>

                    </div>
                )
              }
            })()}




        <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="file" />
        <FormText color="muted">

        </FormText>
        </FormGroup>


                <div>
                {(() => {
                    if(page === 'EDITITEM') {
                        return <Button color="primary" onClick={toggle} id="confirm" block>Save changes</Button>
                    }else if(page == 'ADDFORSALE'){
                        return <Button color="primary" onClick={toggle} id="confirm" block>Confirm</Button>
                    }else{
                        return <Button color="primary" style={{visibility:'hidden'}} onClick={toggle} id="confirm" block>Confirm</Button>
                    }
                })()}


                    <Modal isOpen={modal} toggle={toggle} className={className}>
                    {(() => {
                    if(page === 'EDITITEM') {
                       return  <ModalHeader toggle={toggle}>Confirm changes</ModalHeader>
                    }else{
                        return  <ModalHeader toggle={toggle}>Confirm sale</ModalHeader>
                    }
                    })()}
                    <ModalBody>
                    <div>Title: {title}</div>
                    <div>Description: {description}</div>
                    <div>Price: {price} €</div>
                    </ModalBody>
                    <ModalFooter>
                    {(() => {
                    if(page === 'EDITITEM') {
                        return (  <Button color="primary" onClick={submitChanges}>Save changes</Button>)
                    }else if (page === 'ADDFORSALE'){
                        return ( <Button color="primary" onClick={addForSale}>Add to sales</Button>)
                    }else{
                        return ( <Button color="primary" onClick={submitNew}>Confirm</Button>)
                    }
                    })()}

                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>


        </Form>
        </div>
      );
}


export default SellItem;
