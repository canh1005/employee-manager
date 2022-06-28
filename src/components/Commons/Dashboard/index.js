import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { dashBoardStyled } from "material-ui";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

const pages = [{ icon: <PersonIcon />, name: 'Employee', path: "/" }, { icon: <GroupsIcon />, name: 'Team', path: "/team" }]
function DashBoard() {
  const classes = dashBoardStyled();
  // const [isActive, setIsActive] = useState("/")
  const location = useLocation();
  console.log("location",location.pathname);
  return (
    <Box className={classes.root}>
      <Link to="/" className={classes.title}>
        <Typography variant="span">Employee Managment</Typography>
      </Link>
      <Box className={classes.menu}>
        {pages.map((page, index) => {
          return <NavLink key={index} to={page.path} className={classes.link} >
            {page.icon}<Typography variant="span">{page.name}</Typography>
          </NavLink>
        })}
      </Box>
    </Box>
  );
}
export default React.memo(DashBoard);
