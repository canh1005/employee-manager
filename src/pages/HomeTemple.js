import React from 'react'
import { appGlass } from "material-ui";
import { Box } from '@mui/material';
import Dashboard from 'components/Commons/Dashboard';
import { Outlet } from 'react-router-dom';


function HomeTemple() {
  const classes = appGlass();

  return (
    <Box className={classes.root}>
      <Dashboard />
      <Outlet/>
    </Box>
  )
}

export default HomeTemple