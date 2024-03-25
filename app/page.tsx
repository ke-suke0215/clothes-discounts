"use client";

import { Grid, Container, TextField } from "@mui/material";
import ItemCard from "./components/ItemCard";
import { useState } from "react";

async function getItems(name: String): Promise<Item[]> {
  const response = await fetch(`http://localhost:3000/api/items?name=${name}`, {
    method: "GET",
  });
  return await response.json();
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]); // 状態を管理するための useState フック
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItems(await getItems(searchText));

    // TODO: 検索結果がなかったときに何かしらのメッセージを表示したい
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
        <form onSubmit={handleSearch}>
          <TextField
            id="outlined-basic"
            label="商品名を入力"
            variant="outlined"
            size="small"
            value={searchText}
            sx={{ width: "60%", mb: 5 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
        {/* TODO: 検索中のときにスケルトンを表示したい */}
        {items.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              color: "gray",
              fontSize: "2rem",
            }}
          >
            商品を検索してください
          </div>
        ) : (
          <Grid container spacing={4} justifyContent="flex-start">
            {items.map((item: Item) => (
              <Grid key={item.id} item>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}
