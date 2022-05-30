import "./App.css";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import PageNotFound from "./pages/PageNotFound";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import EmployeeDetail from "./components/EmployeeDetail";
import TeamPage from "./pages/TeamPage";
import ListEmployee from "./components/ListEmployee";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns }>
      <Routes>
        <Route path="/" element={<EmployeePage />}>
          <Route path="/" element={<ListEmployee/>}/>
          <Route path=":id" element={<EmployeeDetail/>}/>
          <Route path="team" element={<TeamPage/>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
