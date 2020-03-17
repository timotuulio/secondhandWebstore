import React from 'react';
import useFetch from "use-http";
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import App from './containers/appContainer.js';
import reducers from './reducers/rootReducer';

const { useState, useEffect } = React;

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnchancers());

    function Main(){
      console.log(store.getState().pageReducer.page)
      return(
          <Provider store={store}>
            <App />
          </Provider>
      )
    }



export default Main;
