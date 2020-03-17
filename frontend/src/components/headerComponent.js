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
  mainAction
} from '../actions/actions.js';


const Header =({page,mainAction}) => {
  
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Verkkokauppa</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2">
          <Button size="lg">Profiili</Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
          <Button >Kaupat</Button>
          </ButtonGroup>
            
            <Button>Jotain</Button>
            {(() => {
            if (page=='LOGIN') {
            return <Button >Kasdsadt</Button> ;
            }
            })()}
    
    </ButtonToolbar>
            
          </Nav>
          <Button onClick={mainAction}>Kirjaudu sisään</Button>
          
        </Collapse>
            
      </Navbar>
    </div>
  );
}

//export default Header;


const mapStateToProps = (state) => ({
  value: state.addReducer.value,
  page: state.pageReducer.page
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
  mainAction: () => dispatch(mainAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);