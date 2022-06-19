import { Box } from '@mui/material'
import { employeeDetail } from 'material-ui';
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function EmployeeTabs() {
    const classes = employeeDetail();

    return (
        <Box>
            <Box className={classes.employeeTabs}>
                <Link to="info">Information</Link>
                <Link to="working">Working</Link>
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