import React from "react";
import Image from "next/image";
import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={140} height={40} />
          </Link>
        </Toolbar>
      </AppBar>
      {/* AppBarの高さに合わせた空のToolbarを追加 */}
      <Toolbar />
    </Box>
  );
};

export default Header;
