import Signup from '../components/signupComponent.js';
import {
    mainAction,
    loginSuccessAction,
} from '../actions/actions.js';

import {
    connect
} from 'react-redux';


const mapStateToProps = (state) => ({
    page: state.pageReducer.page,
    login: state.loginReducer.login
});

const mapDispatchToProps = (dispatch) => ({
    mainAction: () => dispatch(mainAction()),
    loginSuccessAction: (userData) => dispatch(loginSuccessAction(userData))

});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
