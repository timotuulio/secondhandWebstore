// React component for the header

import React,{ useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ButtonToolbar,ButtonGroup,Button,Collapse,Navbar,NavbarBrand,Nav
} from 'reactstrap';


import { connect } from 'react-redux';

import {
  incrementAction,
  decreaseAction,
  mainAction,
  loggedOutAction,
  loginSuccessAction,
  loginAction,
  ownProfileAction,
  userAddNewItemAction
} from '../actions/actions.js';


const Header =({login,loginAction,loggedOutAction,user,ownProfileAction,userAddNewItemAction,mainAction}) => {

  const [isOpen, setIsOpen] = useState(false);


  return (

      <Navbar sticky="top" style={{backgroundColor:'#2B3856'}}>
        <NavbarBrand href="/">Verkkokauppa</NavbarBrand>

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

//export default Header;


const mapStateToProps = (state) => ({
  value: state.addReducer.value,
  page: state.pageReducer.page,
  login: state.loginReducer.login,
  user: state.loginReducer
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
  mainAction: () => dispatch(mainAction()),
  loggedOutAction: () => dispatch(loggedOutAction()),
  loginSuccessAction: (data) => dispatch(loginSuccessAction(data)),
  loginAction: () => dispatch(loginAction()),
  ownProfileAction: () => dispatch(ownProfileAction()),
  userAddNewItemAction: () => dispatch(userAddNewItemAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
