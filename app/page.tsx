import { Button, Grid, Paper, Container } from "@mui/material";
import Image from "next/image";
import Card from "./components/Card";

async function getItems(name: String) {
  const response = await fetch(`http://localhost:3000/api/items?name=${name}`, {
    cache: "no-store",
  });
  return await response.json();
}

export default async function Home() {
  const items = await getItems("セーター");
  console.log(items);

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={4} justifyContent="flex-start">
          {[0, 1, 2, 3, 4].map((value) => (
            <Grid key={value} item>
              <Card />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
