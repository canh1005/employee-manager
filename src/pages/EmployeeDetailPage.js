import { Box, Container } from "@mui/material";
import Loading from "components/Commons/Loading";
import EmployeeInfoDetail from "components/EmployeeDetail/EmployeeInfo";
import EmployeeTabs from "components/EmployeeDetail/EmployeeTabs";
import React from "react";
import { useSelector } from "react-redux";

function EmployeeDetailPage() {
  const loadingImage = useSelector((state) => state.imageReducer.loading);

  return (
    <>
      {loadingImage ? (
        <Loading />
      ) : (
        <Container>
          <EmployeeInfoDetail />
          <EmployeeTabs />
        </Container>
      )}
    </>
  );
}

export default EmployeeDetailPage;
