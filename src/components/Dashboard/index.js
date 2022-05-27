import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { dashBoardStyled } from "../../material-ui";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
function DashBoard() {
  const classes = dashBoardStyled();
  return (
    <Box className={classes.root}>
      <Box>
        <Link to="/" className={classes.link}>
          <Typography variant="span">Employee Managment</Typography>
        </Link>
      </Box>
      <Box className={classes.menu}>
        <Link to="/" className={`${classes.link} active`}>
          <PersonIcon/><Typography variant="span">Employee</Typography>
        </Link>
        <Link to="team" className={classes.link}>
          <GroupsIcon/><Typography variant="span">Team</Typography>
        </Link>
      </Box>
    </Box>
  );
}
export default React.memo(DashBoard);
