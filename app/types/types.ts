interface Item {
  id: number;
  name: string;
  pageUrl: string;
  imageUrl: string;
  addedOn: Date;
}

interface CalenderDates {
  [key: number]: { [key: number]: number[] };
}
