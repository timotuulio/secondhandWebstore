

import Profile from '../components/profileComponent.js';

import { connect } from 'react-redux';

import {
  mainAction,
  registerAction,
  updateProfileAction

} from '../actions/actions.js';



const mapStateToProps = (state) => ({
    page: state.pageReducer.page,
    login: state.loginReducer.login,
    user: state.loginReducer.user,
    token: state.loginReducer.token
  });

  const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    registerAction: () => dispatch(registerAction()),
    updateProfileAction: (data) => dispatch(updateProfileAction(data))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
