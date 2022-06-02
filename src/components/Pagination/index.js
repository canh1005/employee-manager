import React from "react";
import Pagination from "@mui/material/Pagination";

export default function Paginations(props) {
  const handleChange = (event) => {
    props.setPage(event.target.textContent);
    console.log(event.target.textContent);
  };
  const style = {
    marginTop: "20px",
    "& ul": {
      justifyContent: "flex-end",
    },
  };
  return (
    <Pagination
      count={2}
      variant="outlined"
      shape="rounded"
      color="primary"
      onChange={(event) => handleChange(event)}
      sx={style}
    />
  );
}
