import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { ThemeProvider } from "@mui/material";
import { theme } from "material-ui";
import { routes } from "./utils/routes";

function App() {
  let element = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {element}
        
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
