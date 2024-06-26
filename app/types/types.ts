interface Item {
  id: number;
  name: string;
  pageUrl: string;
  imageUrl: string;
  addedOn: Date;
}

interface LimitedDiscount {
  item_id: number;
  price: number;
  addedOn: Date;
}

interface CalenderDates {
  [year: number]: { [month: number]: number[] };
}
