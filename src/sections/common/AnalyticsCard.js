import React from "react";
import { TableContainer, TableBody, TableHead, Table, Paper, TableRow, TableCell } from "@mui/material";

const AnalyticsCard = ({ names, values }) => {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table
        sx={{
          "& .MuiTableCell-head": {
            fontSize: "1.2rem",
            fontWeight: "bold",
            textAlign: "center",
          },
          "& .MuiTableCell-body": {
            fontSize: "1.2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "blue",
          },
        }}
      >
        <TableHead>
          <TableRow>
            {names.map((item, index) => (
              <TableCell key={index}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {values.map((item, index) => (
              <TableCell key={index}>{item ?? "-"}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnalyticsCard;
