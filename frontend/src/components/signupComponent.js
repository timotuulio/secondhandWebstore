import React from 'react';
import { Button, Form, FormGroup, Label, Input,Card, CardHeader,CardBody,CardFooter } from 'reactstrap';
import {
  mainAction,
  loginSuccessAction,
  loginFailedAction,
  loggedOutAction,
  registerAction

} from '../actions/actions.js';
import { connect } from 'react-redux';

const Signup = ({registerAction}) => {
  return (
    <div style={{
      display: "flex",
      margin: "70px",
      justifyContent: "center",
          alignItems: "center"
      }}>
  <Form>
    <h2 className="display-4">Rekisteröityminen</h2>
    <hr className="my-2" />
    <br/><br/>
    <Card className="text-center">
                        
      <CardHeader></CardHeader>
        <CardBody>
        <FormGroup>
        <Input type="text" name="name" id="name" placeholder="Nimi" />
      </FormGroup>
      <FormGroup>
        <Input type="email" name="email" id="email" placeholder="Sähköposti" />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="password" placeholder="Salasana" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="bank" id="bank" placeholder="Tilinumero" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="phone" id="phone" placeholder="Puhelinnumero" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="address" id="address" placeholder="Osoite" />
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Rooli</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Käyttäjä
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Kauppias
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1"/>{' '}
            Ylläpitäjä
          </Label>
        </FormGroup>
      </FormGroup>                        
        </CardBody>
        <CardFooter>
        <Button color="primary" size="lg" >Rekisteröidy</Button>
        </CardFooter>               
      </Card>
    </Form>

    </div>
    
  );
}



const mapStateToProps = (state) => ({
  value: state.addReducer.value,
  page: state.pageReducer.page,
  login: state.loginReducer.login
});

const mapDispatchToProps = (dispatch) => ({
  mainAction: () => dispatch(mainAction()),
  registerAction: () => dispatch(registerAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

