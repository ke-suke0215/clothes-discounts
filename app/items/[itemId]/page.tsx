"use client";

import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import DiscountsCalender from "@/app/components/DiscountsCalender";
import { setLazyProp } from "next/dist/server/api-utils";
import DiscountsList from "@/app/components/DiscountsList";

const getItem = async (id: number): Promise<Item> => {
  const response = await fetch(`/api/items/${id}`, {
    method: "GET",
  });

  const item: Item = await response.json();
  return item;
};

/**
 * APIから日付データを取得する.
 */
const fetchDiscountDates = async (
  itemId: number
): Promise<LimitedDiscount[]> => {
  const response = await fetch(`/api/limitedDiscounts/${itemId}`, {
    method: "GET",
  });

  const limitedDiscounts: LimitedDiscount[] = await response.json();
  return limitedDiscounts;
};

const fixDiscountDates = (
  limitedDiscounts: LimitedDiscount[]
): CalenderDates => {
  const result: CalenderDates = {};

  limitedDiscounts.forEach((limitedDiscount) => {
    const date = new Date(limitedDiscount.addedOn);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (result[year] === undefined) {
      result[year] = {};
    }
    if (result[year][month] === undefined) {
      result[year][month] = [];
    }
    result[year][month].push(day);
  });

  return result;
};

const ItemDetailPage = ({ params }: { params: { itemId: string } }) => {
  const [item, setItem] = useState({} as Item);
  const [limitedDiscounts, setLimitedDiscounts] = useState(
    [] as LimitedDiscount[]
  );
  const [discountDates, setDiscountDates] = useState({} as CalenderDates);

  const itemIdAsNumber: number = parseInt(params.itemId);

  /**
   * ItemをIDから検索する.
   */
  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem: Item = await getItem(itemIdAsNumber);
      setItem(fetchedItem);
    };

    fetchItem();
  }, [itemIdAsNumber]);

  /**
   * 割引情報を取得する.
   */
  useEffect(() => {
    const fetchLimitedDiscounts = async () => {
      const fetchedLimitedDiscounts: LimitedDiscount[] = await (
        await fetchDiscountDates(itemIdAsNumber)
      ).map((limitedDiscount) => {
        return {
          ...limitedDiscount,
          addedOn: new Date(limitedDiscount.addedOn),
        };
      });

      setLimitedDiscounts(fetchedLimitedDiscounts);
    };

    fetchLimitedDiscounts();
  }, [itemIdAsNumber]);

  /**
   * 割引情報が取得されたとき日付データを生成する.
   */
  useEffect(() => {
    const fetchDiscountDates = async () => {
      const fetchedDiscountDates: CalenderDates =
        fixDiscountDates(limitedDiscounts);

      setDiscountDates(fetchedDiscountDates);
    };

    fetchDiscountDates();
  }, [limitedDiscounts]);

  return (
    <div>
      <h1>{item.name}</h1>
      <DiscountsCalender discountDates={discountDates} />
      <DiscountsList limitedDiscounts={limitedDiscounts} />
      <CardMedia component="img" alt={item.name} image={item.imageUrl} />
      {item.pageUrl && <Link href={item.pageUrl}>公式サイト</Link>}
    </div>
  );
};

export default ItemDetailPage;
