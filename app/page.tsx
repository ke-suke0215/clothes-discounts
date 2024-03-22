import { Button, Grid, Paper, Container } from "@mui/material";
import Image from "next/image";
import Card from "./components/Card";

export default function Home() {
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
