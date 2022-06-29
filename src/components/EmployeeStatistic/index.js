import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actGetStatisticAPI } from "redux/modules/StatisticsReducer/action";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Loading from "components/Commons/Loading";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { actGetWorkingAPI } from "redux/modules/WorkingReducer/action";

const months = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 6,
    label: 6,
  },
  {
    value: 7,
    label: 7,
  },
  {
    value: 8,
    label: 8,
  },
  {
    value: 9,
    label: 9,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 11,
    label: 11,
  },
  {
    value: 12,
    label: 12,
  },
];

function EmployeeAdvances(props) {
  //get data form store and declare a dispatch action
  const statisticInfo = useSelector((state) => state.statisticReducer.data);
  const loading = useSelector((state) => state.statisticReducer.loading);
  const dispatch = useDispatch();
  const working = useSelector((state) => state.workingReducer.data);

  const [data, setData] = useState({
    labels: `${working ? [working.map((item) => moment(item.date).format("DD"))] : ""}`,
    datasets: [
      {
        label: "Employee working hours",
        data: `${working ? working.map((item) => item.hour) : ""}`,
      },
    ],
  });
  console.log("data",data.labels);

  const employeeID = useParams().id;
  moment().format("YYYY-MM-DD");
  console.log("moment", moment("2022-05").format("YYYY-MM"));
  const [month, setMonth] = useState({
    value: moment().format("YYYY-MM"),
  });
  console.log("month", moment().months());

  useEffect(() => {
    dispatch(actGetStatisticAPI(employeeID, month.value));
    dispatch(actGetWorkingAPI(employeeID));
  }, [month]);

  const handleChange = (event) => {
    setMonth({
      value: event.target.value,
    });
    console.log("change", month);
  };
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
    <div style={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControl sx={{ width: "100px" }}>
          <InputLabel id="month-select">Month</InputLabel>
          <Select
            labelId="month-select"
            value={month.value}
            label="Month"
            onChange={handleChange}
          >
            {months.map((monthItem) => (
              <MenuItem
                disabled={
                  moment().months() + 1 < monthItem.value ? true : false
                }
                value={moment(`${moment().year()}-${monthItem.value}`).format(
                  "YYYY-MM"
                )}
              >
                {monthItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Bar
        options={{ maintainAspectRatio: false }}
        width={100}
        height={50}
        data={data}
        {...props}
      />
      {loading ? <Loading /> : renderStatisticInfo()}
    </div>
  );
}
export default EmployeeAdvances;
