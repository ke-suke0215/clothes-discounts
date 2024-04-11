import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface ItemProps {
  item: Item;
}

const ItemCard = ({ item }: ItemProps) => {
  return (
    <Link href={`/items/${item.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 260 }}>
        <CardMedia component="img" alt={item.name} image={item.imageUrl} />
        <CardContent>
          <Typography component="div" sx={{ textDecoration: "none" }}>
            {item.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
