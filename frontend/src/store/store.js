import reducers from '../reducers/rootReducer';

import { createStore, compose } from 'redux';


const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnchancers());


export default store;