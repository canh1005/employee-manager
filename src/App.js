import "./App.css";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns }>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="404" element={<PageNotFound />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
