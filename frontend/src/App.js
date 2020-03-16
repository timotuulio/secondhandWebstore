import React from 'react';
import useFetch from "use-http";
import Header from './components/headerComponent.js';
import AllItems from './components/allItemsComponent.js'

const { useState, useEffect } = React;

    function Players(){
        return(
            <Header />,
            <AllItems />
        )

    }



export default Players;
