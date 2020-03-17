
import App from '../components/appComponent';
import { connect } from 'react-redux';

import {
  incrementAction,
  decreaseAction,
  mainAction
} from '../actions/actions.js';



const mapStateToProps = (state) => ({
    value: state.addReducer.value,
    page: state.pageReducer.page
  });
  
const mapDispatchToProps = (dispatch) => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
    mainAction: () => dispatch(mainAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);