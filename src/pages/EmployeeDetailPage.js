import { Box } from '@mui/material'
import EmployeeInfoDetail from 'components/EmployeeDetail/EmployeeInfo'
import EmployeeTabs from 'components/EmployeeDetail/EmployeeTabs'
import React from 'react'

function EmployeeDetailPage() {

    return (
        <Box sx={{margin: "0 20px"}}>
            <EmployeeInfoDetail />
            <EmployeeTabs/>
        </Box>
    )
}

export default EmployeeDetailPage