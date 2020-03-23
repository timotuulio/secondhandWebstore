// React component for when one item is shown
import React from 'react';
import useFetch from "use-http";

function Item() {
    async function fetchData() {
        const res = await fetch('http://localhost:3001/api/item');

        res.json().then(res => console.log(res)).catch(err => setErrors(err));
    }

}
