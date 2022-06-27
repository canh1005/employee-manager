import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import moment from "moment";
import { informationStyled } from "material-ui";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";

function EmployeeInfo() {
  const classes = informationStyled();
  const empInfo = useSelector((state) => state.employeeDetailReducer.data);
  const teamInfo = useSelector((state) => state.teamReducer.data);
  return (
    <Box className={classes.root}>
      {empInfo ? (
        <>
          <Box component="p">
            <CalendarMonthIcon />
            <Box>
              <Typography variant="span">Start Date</Typography>
              <Typography variant="span">
                {moment(empInfo.startDay).format("DD-MM-YYYY")}
              </Typography>
            </Box>
          </Box>
          <Box component="p">
            <GroupIcon />
            <Box>
              <Typography variant="span">Team</Typography>
              <Typography variant="span">
                {teamInfo && teamInfo.find(item => item.id === empInfo.teamID).name}
              </Typography>
            </Box>
          </Box>
          <Box component="p">
            <HomeIcon />
            <Box>
              <Typography variant="span">Address</Typography>
              <Typography variant="span">{empInfo.address}</Typography>
            </Box>
          </Box>
          <Box component="p">
            <MonetizationOnIcon />
            <Box>
              <Typography variant="span">Sallary per hour</Typography>
              <Typography variant="span">{empInfo.moneyPerHour}</Typography>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
export default EmployeeInfo;
