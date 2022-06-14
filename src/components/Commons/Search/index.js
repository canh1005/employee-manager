import { Box, InputBase } from "@mui/material";
import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { searchStyled } from "material-ui";
import PropTypes from "prop-types";

SearchFrom.propTypes = {
  onSubmit: PropTypes.func,
};

function SearchFrom(props) {
  const { onSubmit } = props;
  const typeingTimeouteRef = useRef(null);
  const classes = searchStyled();
  const handleChange = (e) => {
    if (typeingTimeouteRef.current) {
      clearTimeout(typeingTimeouteRef.current);
    }
    typeingTimeouteRef.current = setTimeout(() => {
      onSubmit(e.target.value);
    }, 300);
  };
  return (
    <Box className={classes.search}>
      <Box className={classes.searchIconWrapper}>
        <SearchIcon />
      </Box>
      <InputBase
        className={classes.inputBase}
        placeholder="Search employee by name"
        inputProps={{ "aria-label": "Search employee by name" }}
        onChange={handleChange}
      />
    </Box>
  );
}

export default SearchFrom;
