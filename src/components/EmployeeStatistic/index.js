import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useResolvedPath } from "react-router-dom";
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
import {
  actClearData,
  actGetWorkingAPI,
} from "redux/modules/WorkingReducer/action";
import { useLocation } from "react-router-dom";
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

  let location = useLocation();
  
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Employee working hours in month",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  });

  const employeeID = useParams().id;
  moment().format("YYYY-MM-DD");

  useEffect(() => {
    console.log("statistic mount! ");
    dispatch(actGetStatisticAPI(employeeID, month));
    dispatch(actGetWorkingAPI(employeeID));
    setData({
      ...data,
      labels:
        working &&
        working.length > 0 &&
        working
          .filter(
            (item) =>
              moment(item.date).month() + 1 ===
              Number(moment(month).format("M"))
          )
          .map((el) => moment(el.date).format("DD-MM")),
      datasets: [
        {
          label: "Employee working hours in month",
          data:
            working &&
            working.length > 0 &&
            working
              .filter(
                (item) =>
                  moment(item.date).month() + 1 ===
                  Number(moment(month).format("M"))
              )
              .map((el) => el.hour),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgb(255, 99, 132)"],
          borderWidth: 1,
        },
      ],
    });
    return () => {
      console.log("statistic unmount!", data.labels);
    };
  }, [month, working && working.length > 0]);

  const handleChange = (event) => {
    setMonth(event.target.value);
    console.log("change", month);
  };

  const renderStatisticInfo = () => {
    if (statisticInfo) {
      return (
        <Box>
          <Typography>
            Number of working day: {statisticInfo.numberOfWorkingDay}
          </Typography>
          <Typography>Total get: {statisticInfo.totalGet}</Typography>
          <Typography>Total advances: {statisticInfo.totalAdvances}</Typography>
          <Typography>Summary: {statisticInfo.totalSalary}</Typography>
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
            value={month}
            label="Month"
            onChange={handleChange}
          >
            {months.map((monthItem, index) => (
              <MenuItem
                key={index}
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
