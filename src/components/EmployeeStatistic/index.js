import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { actGetStatisticAPI } from "../../redux/modules/GetStatisticsReducer/action";
import { Box, Typography } from "@mui/material";

function EmployeeAdvances(props) {
  const { statisticInfo } = props;
  const employeeID = useParams().id;
  useEffect(() => {
    props.fetchStatisticsInfo(employeeID);
  }, []);
  const renderStatisticInfo = () => {
    if (statisticInfo) {
      return <Box>
        <Typography>Number of working day:{statisticInfo.numberOfWorkingDay}</Typography>
        <Typography>Total get:{statisticInfo.totalGet}</Typography>
        <Typography>Total advances:{statisticInfo.totalAdvances}</Typography>
        <Typography>Summary:{statisticInfo.summary}</Typography>
      </Box>
    }
  };
  return (
    <div style={{ height: 400, width: "100%" }}>{renderStatisticInfo()}</div>
  );
}
const mapStateToProps = (state) => {
  return {
    statisticInfo: state.getStatisticReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStatisticsInfo: (id) => {
      dispatch(actGetStatisticAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAdvances);
