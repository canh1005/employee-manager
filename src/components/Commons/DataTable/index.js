import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { dataTableStyled } from "material-ui";

export default function DataTable({ rows, columns }) {
  const classes = dataTableStyled();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            {columns.map((column, index) => {
              return <TableCell key={index}>{column.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index}>{row[column.field]}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <Box sx={{textAlign: "center"}}>
              <Typography>No data found!</Typography>
            </Box>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};
