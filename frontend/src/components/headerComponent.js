// React component for the header

import React,{ useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ButtonToolbar,ButtonGroup,Button,Collapse,Navbar,NavbarBrand,Nav
} from 'reactstrap';
import { ADMIN } from '../stateNames'



const Header =({login,loginAction,loggedOutAction,user,ownProfileAction,userAddNewItemAction,mainAction,allUsersAction}) => {


  return (

      <Navbar sticky="top" style={{backgroundColor:'#2B3856'}}>
        <NavbarBrand style={{color:"#007bff"}}>Paavon Putiikki</NavbarBrand>

          <Nav className="mr-auto" navbar>
          <ButtonToolbar aria-label="Toolbar with button groups">

          <ButtonGroup className="mr-2">
          </ButtonGroup>

            {(() => {
            if (login=='LOGGEDIN') {
            return <div>
                    <ButtonGroup className="mr-2">
                    <Button color="primary" onClick={mainAction}>Shop</Button>
                    <Button color="primary" onClick={ownProfileAction}>Profile</Button>
                    <Button color="primary" onClick={userAddNewItemAction}>Sell product</Button>
                      {(() => {
                          if (user.role == ADMIN) {
                              return <Button color="primary" onClick={allUsersAction}>All users</Button>;
                          }
                      })()}
                    </ButtonGroup>
                    </div> ;
            }
            })()}

          </ButtonToolbar>

          </Nav>
          {(() => {
            if (login!='LOGGEDIN') {
              return <Button color="primary" onClick={loginAction}>Kirjaudu sisään</Button>;

            }else{

              //return(<div><Button>asdad</Button></div>);
              return (<div style={{display: 'inline-block'}}><div style={{color: "white"}}>Welcome {user.user.name}</div><Button color="primary" onClick={loggedOutAction}>Log out</Button></div>);

            }
          })()}

      </Navbar>

  );
}

export default Header;