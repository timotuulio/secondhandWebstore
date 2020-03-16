// React component for when all items are shown
import React from 'react';
import useFetch from "use-http";

function AllItems() {
  async function fetchData() {
      const res = await fetch('http://localhost:3001/api/item');

      res
          .json()
          .then(res => console.log(res));
  }
  const testItems = [
    {
        "_id": "5e6d1dd29339230cc6f8076c",
        "price": 100,
        "title": "A thingie",
        "__v": 0
    },
    {
        "_id": "5e6d34d4f5b37b0ecc4821ac",
        "price": 90,
        "title": "A secret thingie",
        "__v": 0
    }
];
  const items = testItems/*fetchData()*/;
  const itemsToRender = [];
  console.log(items);
  items.map(itm => {
    itemsToRender.push(<div>
      <p>{itm.title}</p>
    </div>)
  });

  return itemsToRender;
}

export default AllItems;
