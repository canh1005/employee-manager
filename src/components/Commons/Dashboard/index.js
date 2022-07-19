import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { dashBoardStyled } from "material-ui";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch } from "react-redux";
import { actActiveLink } from "redux/modules/DashBoardReducer/action";

const pages = [
  { icon: <PersonIcon />, name: "Employee", path: "" },
  { icon: <GroupsIcon />, name: "Team", path: "team" },
];
function DashBoard() {
  const dispatch = useDispatch();
  let location = useLocation();
  const classes = dashBoardStyled();
  
  return (
    <Box className={classes.root}>
      <Link
        to="employee"
        className={classes.title}
        onClick={() => dispatch(actActiveLink(0))}
      >
        <Typography variant="span">Employee Managment</Typography>
      </Link>
      <Box className={classes.menu}>
        <NavLink to="employee" className={({ isActive }) => isActive || (location.pathname !== "/employee" && location.pathname !== "/team") ? `${classes.link} active` : `${classes.link}`}><PersonIcon /> Employee</NavLink>
        <NavLink to="team" className={({ isActive }) => isActive ? `${classes.link} active` : `${classes.link}`}><GroupsIcon /> Team</NavLink>
      </Box>
    </Box>
  );
}
export default DashBoard;
