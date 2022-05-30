import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import moment from "moment";

export default function EmployeeDetailTabs(props) {
  const { employeeInfo } = props;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Information" value="1" />
            <Tab label="Working" value="2" />
            <Tab label="Advances" value="3" />
            <Tab label="Statistics" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box component="p">
            <Typography variant="span">Start Date:</Typography>
            <Typography variant="span">
              {moment(employeeInfo.startDate).format("DD-MM-YYYY")}
            </Typography>
          </Box>
          <Box component="p">
            <Typography variant="span">Team:</Typography>
            <Typography variant="span">
              {employeeInfo.teamID}
            </Typography>
          </Box>
          <Box component="p">
            <Typography variant="span">Address:</Typography>
            <Typography variant="span">
              {employeeInfo.address}
            </Typography>
          </Box>
          <Box component="p">
            <Typography variant="span">Sallary per hour:</Typography>
            <Typography variant="span">
              {employeeInfo.moneyPerHour}
            </Typography>
          </Box>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
