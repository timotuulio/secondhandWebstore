import Login from '../components/loginComponent.js';

import { connect } from 'react-redux';

import {
  incrementAction,
  decreaseAction,
  mainAction,
  loginSuccessAction,
  loginFailedAction,
  loggedOutAction

} from '../actions/actions.js';



const mapStateToProps = (state) => ({
    value: state.addReducer.value,
    page: state.pageReducer.page,
    login: state.loginReducer.login
  });
  
  const mapDispatchToProps = (dispatch) => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
    mainAction: () => dispatch(mainAction()),
    loginSuccessAction: () => dispatch(loginSuccessAction()),
    loginFailedAction: ()  => dispatch(loginFailedAction()),
    loggedOutAction: () => dispatch(loggedOutAction())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);