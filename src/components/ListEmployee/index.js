import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { actListEmpAPI } from "../../redux/modules/ListEmployeeReducer/action";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavigate } from "react-router-dom";
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
  Tooltip,
  Typography,
} from "@mui/material";
import EmployeeModal from "../EmployeeModal";
import Paginations from "../Pagination";

function ListEmployee(props) {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const [selected, setSelected] = useState([]);
  const { listEmp } = props;
  const navigate = useNavigate();
  const handleSelect = (e) => {
    console.log(e.target);
    // if (listEmp) {
    //   let newSelect = listEmp.map((employee)=> employee.id === )
    // }
  };

  useEffect(() => {
    props.fetchListEmp(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleEmployeeDetail = (employee) => {
    navigate(`${employee.no}`, { replace: true });
  };
  const renderListEmployee = () => {
    if (listEmp) {
      {
        return listEmp.content.map((employee) => {
          return (
            <TableRow
              key={employee.no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  // checked={selected}
                  onClick={(event) => handleSelect(event, employee.id)}
                  // inputProps={{
                  //   "aria-labelledby": labelId,
                  // }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {employee.no}
              </TableCell>
              <TableCell align="right">{employee.fullName}</TableCell>
              <TableCell align="right">{employee.age}</TableCell>
              <TableCell align="right">{employee.address}</TableCell>
              <TableCell>
                <Tooltip title="Employee information">
                  <Button onClick={() => handleEmployeeDetail(employee)}>
                    <InfoOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Delete employee">
                  <Button>
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        });
      }
    }
  };
  return (
    <Box>
      <Box>
        <Tooltip title="Add new employee">
          <Button onClick={handleOpenModal} variant="contained">
            <PersonAddAltRoundedIcon />
          </Button>
        </Tooltip>
      </Box>
      <Typography>List of employee</Typography>
      <EmployeeModal open={openModal} setOpenModal={setOpenModal} />
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
              <TableCell>No#</TableCell>
              <TableCell align="right">FullName</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Team</TableCell>
              <TableCell align="center">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderListEmployee()}</TableBody>
        </Table>
      </TableContainer>
      <Paginations
        setPage={setPage}
        numberOfPage={listEmp ? listEmp.totalPages : 1}
      />
    </Box>
  );
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
