import React from "react";
import { TextField } from "@mui/material";

const SearchArea = () => {
  return (
    <>
      {/* TODO: 検索アイコン入れたい */}
      <TextField
        id="outlined-basic"
        label="商品名を入力してください"
        variant="outlined"
        size="small"
        sx={{ width: "60%", mb: 5 }}
      />
    </>
  );
};

export default SearchArea;
