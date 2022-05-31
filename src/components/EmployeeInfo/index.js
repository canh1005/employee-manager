import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actEmployeeDetailAPI } from "../../redux/modules/EmployeeDetailReducer/action";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import moment from "moment";

function EmployeeInfo(props) {
  const { empInfo } = props;
  const employeeId = useParams().id;
  useEffect(() => {
    props.fetchEmpInfo(employeeId);
  }, []);
  return (
    <Box>
      {empInfo ? (
        <>
          <Box component="p">
            <Typography variant="span">Start Date:</Typography>
            <Typography variant="span">
              {moment(empInfo.startDate).format("DD-MM-YYYY")}
            </Typography>
          </Box>
          <Box component="p">
            <Typography variant="span">Team:</Typography>
            <Typography variant="span">{empInfo.teamID}</Typography>
          </Box>
          <Box component="p">
            <Typography variant="span">Address:</Typography>
            <Typography variant="span">{empInfo.address}</Typography>
          </Box>
          <Box component="p">
            <Typography variant="span">Sallary per hour:</Typography>
            <Typography variant="span">{empInfo.moneyPerHour}</Typography>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    empInfo: state.employeeDetailReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmpInfo: (id) => {
      dispatch(actEmployeeDetailAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo);
