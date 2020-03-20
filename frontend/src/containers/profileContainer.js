

import Profile from '../components/profileComponent.js';

import { connect } from 'react-redux';

import {
  incrementAction,
  decreaseAction,
  mainAction,
  loginSuccessAction,
  loginFailedAction,
  loggedOutAction,
  registerAction

} from '../actions/actions.js';



const mapStateToProps = (state) => ({
    value: state.addReducer.value,
    page: state.pageReducer.page,
    login: state.loginReducer.login,
    user: state.loginReducer.user
  });
  
  const mapDispatchToProps = (dispatch) => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
    mainAction: () => dispatch(mainAction()),
    loginSuccessAction: () => dispatch(loginSuccessAction()),
    loginFailedAction: ()  => dispatch(loginFailedAction()),
    loggedOutAction: () => dispatch(loggedOutAction()),
    registerAction: () => dispatch(registerAction())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);