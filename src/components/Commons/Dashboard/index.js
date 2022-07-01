import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dashBoardStyled } from "material-ui";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import NavBar from "../NavBar";

const pages = [
  { icon: <PersonIcon />, name: "Employee", path: "/" },
  { icon: <GroupsIcon />, name: "Team", path: "/team" },
];
function DashBoard() {
  const classes = dashBoardStyled();
  let location = useLocation();
  return (
    <Box className={classes.root}>
      <Link to="/" className={classes.title}>
        <Typography variant="span">Employee Managment</Typography>
      </Link>
      <Box className={classes.menu}>
        {/* {pages.map((page, index) => {
          console.log(index);
          return (
            <NavBar
              key={index}
              to={page.path}
              exact={index !== 0 ? true : false}
            >
              {page.icon}
              <Typography variant="span">{page.name}</Typography>
            </NavBar>
          );
        })} */}
        <NavBar to={""} className={location !== "/" ? "": `${classes.link} acitve`}>
          <PersonIcon />
          <Typography variant="span">Employee</Typography>
        </NavBar>
        <NavBar to={"team"} >
          <GroupsIcon />
          <Typography variant="span">Team</Typography>
        </NavBar>
      </Box>
    </Box>
  );
}
export default React.memo(DashBoard);
