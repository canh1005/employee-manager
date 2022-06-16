import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "components/Commons/Dashboard";
import { appGlass } from "material-ui";

export default function EmployeePage() {
  const classes = appGlass();
  return (
    <Box className={classes.root}>
      <Dashboard />
      <Outlet/>
    </Box>
  );
}
