import { Box } from "@mui/material";
import React from "react";
import Dashboard from "../components/Dashboard";
import ListEmployee from "../components/ListEmployee";
import { appGlass } from "../material-ui";

export default function HomePage() {
  const classes = appGlass();
  return (
    <Box className={classes.root}>
      <Dashboard />
      <ListEmployee />
    </Box>
  );
}
