import React from 'react';
import useFetch from "use-http";
import { Provider } from 'react-redux';

import App from './containers/appContainer.js';
import store from './store/store.js';

const { useState, useEffect } = React;

    function Main(){
      console.log(store.getState().pageReducer.page)
      return(
          <Provider store={store}>
            <App />
          </Provider>
      )
    }



export default Main;
