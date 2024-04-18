import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DiscountsList = ({
  limitedDiscounts,
}: {
  limitedDiscounts: LimitedDiscount[];
}) => {
  return (
    <div>
      <p>割引履歴</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">日付</TableCell>
              <TableCell align="right">金額(円)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {limitedDiscounts
              .slice()
              .reverse()
              .map((row) => (
                <TableRow
                  key={row.item_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row" align="right">
                    {row.addedOn.getFullYear()}/{row.addedOn.getMonth() + 1}/
                    {row.addedOn.getDate()}
                  </TableCell>
                  <TableCell align="right">
                    {row.price.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DiscountsList;
