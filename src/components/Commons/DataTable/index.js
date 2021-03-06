import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { dataTableStyled } from "material-ui";

export default function DataTable({ rows, columns, ...props }) {
  console.log(props);
  const emptyRows = props.size - props.rowsPerPage;
  console.log({ emptyRows });
  const classes = dataTableStyled();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table sx={{ minWidth: 650, minHeight: 500 }} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            {columns.map((column, index) => {
              return <TableCell key={index}>{column.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            <>
              {rows.map((row, index) => {
                return (
                  <>
                    <TableRow sx={{ height: "50px" }} key={index}>
                      {columns.map((column, index) => {
                        return (
                          <TableCell key={index}>{row[column.field]}</TableCell>
                        );
                      })}
                    </TableRow>
                  </>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 50 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </>
          ) : (
            <>
              <TableRow>
                <TableCell colSpan={12} sx={{ textAlign: "center" }}>No data found!</TableCell>
              </TableRow>
            </>
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
