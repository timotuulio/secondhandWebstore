
import Sell from '../components/sellComponent.js';
import { connect } from 'react-redux';

import {ownSellablesAction} from '../actions/actions.js';

const mapStateToProps = (state) => ({
    user: state.loginReducer.user,
    token: state.loginReducer.token,
    page: state.pageReducer.page,
    item: state.pageReducer.item
  });

  const mapDispatchToProps = (dispatch) => ({
   
    ownSellablesAction: () => dispatch(ownSellablesAction())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Sell);