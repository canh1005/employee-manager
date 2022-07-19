import { Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography>Page Not Found</Typography>
      <NavLink to="/employee">Back to home</NavLink>
    </Box>
  )
}
