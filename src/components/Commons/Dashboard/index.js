import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, matchRoutes, useLocation, useMatch } from "react-router-dom";
import { dashBoardStyled } from "material-ui";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch } from "react-redux";
import { actActiveLink } from "redux/modules/DashBoardReducer/action";
import { routes } from "utils/routes";

const pages = [
  { icon: <PersonIcon />, name: "Employee", path: "" },
  { icon: <GroupsIcon />, name: "Team", path: "team" },
];
function DashBoard() {
  const dispatch = useDispatch();
  let localLink = localStorage.getItem("indexLink");
  let location = useLocation();
  let route = matchRoutes(routes, location);
  const classes = dashBoardStyled();
  console.log("routes: ", route);
  console.log("match: ", route.find(item=>item.pathname === location.pathname));
  console.log("location: ", location.pathname);
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(actActiveLink(Number(0)));
      localStorage.setItem("indexLink", 0);
    }
  }, [location.pathname, localLink]);

  const handleActive = (index) => {
    dispatch(actActiveLink(index));
  };
  return (
    <Box className={classes.root}>
      <Link
        to=""
        className={classes.title}
        onClick={() => dispatch(actActiveLink(0))}
      >
        <Typography variant="span">Employee Managment</Typography>
      </Link>
      <Box className={classes.menu}>
        {pages.map((page, index) => {
          return (
            <Link
              key={index}
              to={page.path}
              onClick={() => handleActive(index)}
              className={
                Number(localLink) === index
                  ? `${classes.link} active`
                  : `${classes.link}`
              }
            >
              {page.icon}
              <Typography variant="span">{page.name}</Typography>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
export default DashBoard;
