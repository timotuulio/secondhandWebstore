
import App from '../components/appComponent';
import { connect } from 'react-redux';

import {
  mainAction
} from '../actions/actions.js';



const mapStateToProps = (state) => ({
    page: state.pageReducer.page,
    login: state.loginReducer.login
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
