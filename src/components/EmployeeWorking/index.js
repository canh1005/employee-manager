import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { actGetWorkingAPI } from "../../redux/modules/EmployeeWorkingReducer/action";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function EmployeeWorking(props) {
  const { workInfo } = props;
  const employeeId = useParams().id;
  useEffect(() => {
    props.fetchWorkInfo(employeeId);
  }, []);
  const renderWorkingInfo = () => {
    if (workInfo) {
      {
        return workInfo.map((workItems) => (
          <TableRow
            key={workItems.no}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {workItems.no}
            </TableCell>
            <TableCell align="center">{workItems.date}</TableCell>
            <TableCell align="center">{workItems.hour}</TableCell>
            <TableCell align="center"><DeleteIcon/></TableCell>
          </TableRow>
        ));
      }
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Hour</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderWorkingInfo()}</TableBody>
      </Table>
    </TableContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    workInfo: state.getWorkingReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkInfo: (id) => {
      dispatch(actGetWorkingAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWorking);
