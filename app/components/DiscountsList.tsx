import React from "react";

const DiscountsList = ({
  limitedDiscounts,
}: {
  limitedDiscounts: LimitedDiscount[];
}) => {
  return (
    <div>
      <p>割引履歴</p>
      <ul>
        {limitedDiscounts.map((limitedDiscount) => (
          <li key={limitedDiscount.item_id}>
            {limitedDiscount.addedOn.getFullYear()}年
            {limitedDiscount.addedOn.getMonth() + 1}月
            {limitedDiscount.addedOn.getDate()}日 {limitedDiscount.price}円
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscountsList;
