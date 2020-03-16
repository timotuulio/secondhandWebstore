import React from 'react';
import useFetch from "use-http";
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import reducers from './reducers/rootReducer';
import Header from './components/headerComponent.js';
import AllItems from './components/allItemsComponent.js'
import Test from './components/test.js'

const { useState, useEffect } = React;

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnchancers());

    function Players(){
      return(
          <Provider store={store}>
            <Header />
            <AllItems />
            <Test />
          </Provider>
      )
    }



export default Players;
