import React from 'react';
import {Provider} from 'react-redux';

import App from './containers/appContainer.js';
import store from './store/store.js';

function Main() {

    return (<Provider store={store}>
        <App/>
    </Provider>)
}

export default Main;
