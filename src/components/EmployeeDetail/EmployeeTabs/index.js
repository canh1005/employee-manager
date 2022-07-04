import { Box  } from '@mui/material'
import { dashBoardStyled } from 'material-ui';
import { employeeDetail } from 'material-ui';
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

function EmployeeTabs() {
    const classes = employeeDetail();
    const classesNavbar = dashBoardStyled();
    return (
        <Box>
            <Box className={classes.employeeTabs}>
                <NavLink to="info" style={({ isActive }) => { return { color: isActive ? "red" : "" } }} >Information</NavLink>
                <NavLink to="working">Working</NavLink>
                <NavLink to="advances">Advances</NavLink>
                <NavLink to="statistics">Statistics</NavLink>
            </Box>
            <Box className={classes.employeeTabsBox}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default EmployeeTabs