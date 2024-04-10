"use client";

import React, { useState, useEffect } from "react";

async function getItem(id: string): Promise<Item> {
  const response = await fetch(`/api/items/${id}`, {
    method: "GET",
  });

  const item: Item = await response.json();
  return item;
}

export const ItemDetailPage = ({ params }: { params: { itemId: string } }) => {
  const [item, setItem] = useState({} as Item);

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem: Item = await getItem(params.itemId);
      setItem(fetchedItem);
    };

    fetchItem();
  }, [params.itemId]);

  console.log(item);

  return (
    <div>
      <h1>{item.name}</h1>
    </div>
  );
};
export default ItemDetailPage;
