import { routes } from "App";
import { dashBoardStyled } from "material-ui";
import React from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";

function NavBar({ to, className, exact, ...props }) {
  let location = useLocation();
  let routesMatchs = matchRoutes(routes, location);
  console.log("loca", routesMatchs);
  let isActive;
  if (exact) {
    isActive = location.pathname === to;
    console.log("item1", isActive);

  } else {
    isActive = routesMatchs.some((match) => {
      console.log("match", match);
      console.log("To", `/${to}`);

      return match.pathname === `/${to}`;
    });
    console.log("item", isActive);
  }
  const classes = dashBoardStyled();

  return (
    <Link
      to={to}
      {...props}
      className={isActive ? `${classes.link} active` : ""}
    />
  );
}

export default NavBar;
