import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import PageNotFound from "./pages/PageNotFound";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TeamPage from "./pages/TeamPage";
import EmployeeInfo from "./components/EmployeeInfo";
import EmployeeWorking from "./components/EmployeeWorking";
import EmployeeAdvances from "./components/EmployeeAdvances";
import EmployeeStatistic from "./components/EmployeeStatistic";
import { ThemeProvider } from "@mui/material";
import { theme } from 'material-ui'
import HomeTemple from "pages/HomeTemple";
import EmployeeDetailPage from "pages/EmployeeDetailPage";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route path="/" element={<HomeTemple />}>
            <Route path="/" element={<EmployeePage />} />
            <Route path=":id" element={<EmployeeDetailPage />}>
              <Route path="info" element={<EmployeeInfo />} />
              <Route path="working" element={<EmployeeWorking />} />
              <Route path="advances" element={<EmployeeAdvances />} />
              <Route path="statistics" element={<EmployeeStatistic />} />
            </Route>
            <Route path="team" element={<TeamPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>

  );
}

export default App;
