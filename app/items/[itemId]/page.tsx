"use client";

import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import DiscountsCalender from "@/app/components/DiscountsCalender";

async function getItem(id: number): Promise<Item> {
  const response = await fetch(`/api/items/${id}`, {
    method: "GET",
  });

  const item: Item = await response.json();
  return item;
}

const ItemDetailPage = ({ params }: { params: { itemId: string } }) => {
  const [item, setItem] = useState({} as Item);

  const itemIdAsNumber: number = parseInt(params.itemId);

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem: Item = await getItem(itemIdAsNumber);
      setItem(fetchedItem);
    };

    fetchItem();
  }, [itemIdAsNumber, params.itemId]);

  return (
    <div>
      <h1>{item.name}</h1>
      <DiscountsCalender itemId={itemIdAsNumber} />
      <CardMedia component="img" alt={item.name} image={item.imageUrl} />
      {item.pageUrl && <Link href={item.pageUrl}>公式サイト</Link>}
    </div>
  );
};

export default ItemDetailPage;