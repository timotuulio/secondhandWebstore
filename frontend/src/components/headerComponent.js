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
  loginSuccessAction
} from '../actions/actions.js';


const Header =({page,login,mainAction,loggedOutAction,loginSuccessAction}) => {
  
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Verkkokauppa</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <ButtonToolbar aria-label="Toolbar with button groups">
          
          <ButtonGroup className="mr-2">
          </ButtonGroup>
            
            {(() => {
            if (login=='LOGGEDIN') {
            return <div>
                    <ButtonGroup className="mr-2">
                    <Button size="lg">Kaupat</Button>
                    <Button size="lg">Profiili</Button>
                    <Button size="lg">Jotain</Button>
                    </ButtonGroup>
                    </div> ;
            }
            })()}
    
    </ButtonToolbar>
            
          </Nav>
          {(() => {
            if (login!='LOGGEDIN') {
              return <Button size="lg" onClick={mainAction}>Kirjaudu sisään</Button>;
            }else{
              return <Button size="lg" onClick={loggedOutAction}>Kirjaudu ulos</Button>;
            }
          })()}
          
        </Collapse>
            
      </Navbar>
    </div>
  );
}

//export default Header;


const mapStateToProps = (state) => ({
  value: state.addReducer.value,
  page: state.pageReducer.page,
  login: state.loginReducer.login
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
  mainAction: () => dispatch(mainAction()),
  loggedOutAction: () => dispatch(loggedOutAction()),
  loginSuccessAction: () => dispatch(loginSuccessAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);