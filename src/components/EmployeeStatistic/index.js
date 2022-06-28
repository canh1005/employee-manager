import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actGetStatisticAPI } from "redux/modules/StatisticsReducer/action";
import { Box, Typography } from "@mui/material";

function EmployeeAdvances() {
  const statisticInfo = useSelector((state) => state.statisticReducer.data);
  const loading = useSelector((state) => state.statisticReducer.loading);
  const dispatch = useDispatch();
  const employeeID = useParams().id;
  useEffect(() => {
    // dispatch(actGetStatisticAPI(employeeID));
  }, []);
  const renderStatisticInfo = () => {
    if (statisticInfo) {
      return (
        <Box>
          <Typography>
            Number of working day:{statisticInfo.numberOfWorkingDay}
          </Typography>
          <Typography>Total get:{statisticInfo.totalGet}</Typography>
          <Typography>Total advances:{statisticInfo.totalAdvances}</Typography>
          <Typography>Summary:{statisticInfo.summary}</Typography>
        </Box>
      );
    }
  };
  return (
    <div style={{ height: 400, width: "100%" }}>{renderStatisticInfo()}</div>
  );
}
export default EmployeeAdvances;
