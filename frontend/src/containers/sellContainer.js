
import Sell from '../components/sellComponent.js';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    user: state.loginReducer.user,
    token: state.loginReducer.token,
    page: state.pageReducer.page,
    item: state.pageReducer.item
  });

  const mapDispatchToProps = (dispatch) => ({
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Sell);