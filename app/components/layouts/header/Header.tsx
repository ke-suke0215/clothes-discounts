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
            <Image src="/logo.png" alt="logo" width={200} height={30} />
          </Link>
        </Toolbar>
      </AppBar>
      {/* AppBarの高さに合わせた空のToolbarを追加 */}
      <Toolbar />
    </Box>
  );
};

export default Header;
