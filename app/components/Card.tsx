import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ImgMediaCard() {
  return (
    // TODO: idを動的にする
    <Link href={`/item/1`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 260 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/436181/item/goods_60_436181.jpg?width=320"
        />
        <CardContent>
          <Typography component="div" sx={{ textDecoration: "none" }}>
            エアリズムカノコポロシャツ（ボタンダウン・半袖）
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
