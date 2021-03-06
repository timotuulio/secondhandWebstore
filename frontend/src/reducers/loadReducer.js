import {
    LOADING,
    LOADED
} from '../stateNames.js'

const initialState = {
    loadState: LOADING,
};

function loadReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADING':
            //console.log("changed state to LOADING");
            return {
                loadState: LOADING
            };
        case 'LOADED':
            //console.log("changed state to LOADED");
            return {
                loadState: LOADED
            };
        default:
            return state;
    }
}

export default loadReducer;
