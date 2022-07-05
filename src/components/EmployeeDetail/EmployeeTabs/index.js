import { Box } from "@mui/material";
import { dashBoardStyled } from "material-ui";
import { employeeDetail } from "material-ui";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const tabs = [
  { name: "Infomation", path: "info" },
  { name: "Working", path: "working" },
  { name: "Advances", path: "advances" },
  { name: "Statistics", path: "statistics" },
];

function EmployeeTabs() {
  const classes = employeeDetail();
  return (
    <Box>
      <Box className={classes.employeeTabs}>
        {tabs.map((tab, index) => {
          return (
            <NavLink
              key={index}
              to={tab.path}
              style={({ isActive }) => {
                return { color: isActive ? "red" : "" };
              }}
            >
              {tab.name}
            </NavLink>
          );
        })}
      </Box>
      <Box className={classes.employeeTabsBox}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default EmployeeTabs;
