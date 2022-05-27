import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { actListEmpAPI } from "../../redux/modules/ListEmployeeReducer/action";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddEmployee from "../AddEmployee";

function ListEmployee(props) {
  const [page, setPage] = useState("1");
  const [selected, setSelected] = useState([]);
  const { listEmp } = props;
  
  const handleSelect = (e) => {
    console.log(e.target);
    // if (listEmp) {
    //   let newSelect = listEmp.map((employee)=> employee.id === )
    // }
  };
  
  useEffect(() => {
    props.fetchListEmp(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderListEmployee = () => {
    if (listEmp) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelect}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell align="right">FullName</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Team</TableCell>
                <TableCell>Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listEmp.content.map((row) => {
                return (
                  <TableRow
                    key={row.no}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // checked={selected}
                        onClick={(event) => handleSelect(event, row.id)}
                        // inputProps={{
                        //   "aria-labelledby": labelId,
                        // }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell align="right">{row.fullName}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell>
                      <Button>
                        <InfoOutlinedIcon />
                      </Button>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };
  return (
    <Box>
      <AddEmployee/>
      {renderListEmployee()}
    </Box>
  )
}
const mapStateToProps = (state) => {
  return {
    listEmp: state.listEmpReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListEmp: (page) => {
      dispatch(actListEmpAPI(page));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListEmployee);
