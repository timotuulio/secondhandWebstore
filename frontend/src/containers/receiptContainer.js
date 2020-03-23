
import Receipts from '../components/receiptComponent.js';
import { connect } from 'react-redux';
import {
  loadedAction,
  mainAction,
  loadingAction,
  editItemAction
} from '../actions/actions.js';

const mapStateToProps = (state) => ({
    loadState: state.loadReducer.loadState,
    user: state.loginReducer.user,
    token: state.loginReducer.token,
    page: state.pageReducer.page
  });

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loadedAction: () => dispatch(loadedAction()),
    loadingAction: () => dispatch(loadingAction()),
    editItemAction: (data) => dispatch(editItemAction(data)),

});


export default connect(mapStateToProps, mapDispatchToProps)(Receipts);