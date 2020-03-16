// React component for the header
import Login from './loginComponent';
import Main from './mainButtonComponent';
import React,{ useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ButtonToolbar,ButtonGroup,Button,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';

const Header =(props) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


 function asd(e){
  e.preventDefault();
  alert("sad");
 }

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
    
    </ButtonToolbar>
            
          </Nav>
          <Button onClick={(e) => alert("keke")}>Kirjaudu sisään</Button>
          
        </Collapse>
            
      </Navbar>
    </div>
  );
}

export default Header;