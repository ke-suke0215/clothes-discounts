import { Button, Grid, Paper, Container } from "@mui/material";
import Image from "next/image";
import ItemCard from "./components/ItemCard";

async function getItems(name: String): Promise<Item[]> {
  const response = await fetch(`http://localhost:3000/api/items?name=${name}`, {
    cache: "no-store",
  });
  return await response.json();
}

export default async function Home() {
  const items: Item[] = await getItems("セーター");

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
        <Grid container spacing={4} justifyContent="flex-start">
          {items.map((item: Item) => (
            <Grid key={item.id} item>
              <ItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
