import {
    LOGGEDIN,
    LOGINFAILED,
    LOGGEDOUT,
    QUEST,
    UPDATEDATA
} from '../stateNames.js'

const initialState = {
    login: LOGGEDOUT,
    token: null,
    user: null,
    role: QUEST
};

function loginReducer(state = initialState, action) {

    switch (action.type) {


        case LOGGEDIN:

            return {
                ...state, login: LOGGEDIN, user: action.data.user, token: action.data.token, role: action.data.user.role
            };
        case LOGINFAILED:
            return {
                ...state, login: LOGINFAILED
            };

        case LOGGEDOUT:
            return {
                ...state, login: LOGGEDOUT, user: null, token: null, role: QUEST
            };

        case UPDATEDATA:
            return {
                ...state, user: action.data
            };
        default:
            return state;
    }
}

export default loginReducer;
