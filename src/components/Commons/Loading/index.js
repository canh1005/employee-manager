import { Box, Typography } from "@mui/material";
import { loaddingStyled } from "material-ui";
import React from "react";

function Loading() {
  const classes = loaddingStyled();
  return (
    <Box className={classes.root}>
      <Typography variant="span"></Typography>
      <Typography variant="span"></Typography>
    </Box>
  );
}

export default Loading;
