import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dashBoardStyled } from "material-ui";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

const pages = [{ icon: <PersonIcon />, name: 'Employee', path: "/" }, { icon: <GroupsIcon />, name: 'Team', path: "team" }]
function DashBoard() {
  const classes = dashBoardStyled();
  const [isActive, setIsActive] = useState(0)
  return (
    <Box className={classes.root}>
      <Link to="/" className={classes.title}>
        <Typography variant="span">Employee Managment</Typography>
      </Link>
      <Box className={classes.menu}>
        {pages.map((page, index) => {
          return <Link key={index} to={page.path} className={isActive === index ? `${classes.link} active` : `${classes.link}`} onClick={() => setIsActive(index)}>
            {page.icon}<Typography variant="span">{page.name}</Typography>
          </Link>
        })}
      </Box>
    </Box>
  );
}
export default React.memo(DashBoard);
