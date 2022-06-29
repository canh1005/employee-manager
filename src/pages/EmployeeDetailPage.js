import { Box, Container } from "@mui/material";
import EmployeeInfoDetail from "components/EmployeeDetail/EmployeeInfo";
import EmployeeTabs from "components/EmployeeDetail/EmployeeTabs";
import React from "react";

function EmployeeDetailPage() {
  return (
    <Container>
      <EmployeeInfoDetail />
      <EmployeeTabs />
    </Container>
  );
}

export default EmployeeDetailPage;
