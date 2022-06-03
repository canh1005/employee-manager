import React from "react";
import Pagination from "@mui/material/Pagination";

export default function Paginations(props) {
  const { numberOfPage, setPage } = props;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const style = {
    marginTop: "20px",
    "& ul": {
      justifyContent: "flex-end",
    },
  };
  return (
    <Pagination
      count={numberOfPage}
      variant="outlined"
      shape="rounded"
      color="primary"
      onChange={handleChange}
      sx={style}
    />
  );
}
