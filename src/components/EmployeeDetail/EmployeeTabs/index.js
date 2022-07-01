import { Box } from '@mui/material'
import NavBar from 'components/Commons/NavBar';
import { dashBoardStyled } from 'material-ui';
import { employeeDetail } from 'material-ui';
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function EmployeeTabs() {
    const classes = employeeDetail();
    const classesNavbar = dashBoardStyled();
    return (
        <Box>
            <Box className={classes.employeeTabs}>
                <NavBar to="info" className={`${classesNavbar.link} active`}>Information</NavBar>
                <NavBar to="working">Working</NavBar>
                <Link to="advances">Advances</Link>
                <Link to="statistics">Statistics</Link>
            </Box>
            <Box className={classes.employeeTabsBox}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default EmployeeTabs