import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

export function Paginations(props) {
  const { numberOfPage, setPage, filter } = props;
  useEffect(() => {
    console.log("page mount!");
    return () => {
      console.log("page unmount!");
    };
  }, []);
  const handleChange = (event, value) => {
    setPage({
      ...filter,
      page: value - 1
    });
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
