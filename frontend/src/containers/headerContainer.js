import {
    connect
} from 'react-redux';
import Header from '../components/headerComponent.js';
import {
    mainAction,
    loggedOutAction,
    loginSuccessAction,
    loginAction,
    ownProfileAction,
    userAddNewItemAction,
    allUsersAction,
    ownSellablesAction,
    offersAction,
    stockAction,
    salesAction
} from '../actions/actions.js';



const mapStateToProps = (state) => ({
    page: state.pageReducer.page,
    login: state.loginReducer.login,
    user: state.loginReducer
});

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loggedOutAction: () => dispatch(loggedOutAction()),
    loginSuccessAction: (data) => dispatch(loginSuccessAction(data)),
    loginAction: () => dispatch(loginAction()),
    ownProfileAction: () => dispatch(ownProfileAction()),
    userAddNewItemAction: () => dispatch(userAddNewItemAction()),
    allUsersAction: () => dispatch(allUsersAction()),
    ownSellablesAction: () => dispatch(ownSellablesAction()),
    offersAction: () => dispatch(offersAction()),
    stockAction: () => dispatch(stockAction()),
    salesAction: () => dispatch(salesAction())

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
