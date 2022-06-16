import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import DataTable from "components/Commons/DataTable";
import { actGetTeamAPI } from "redux/modules/TeamReducer/action";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { actGetEmployeeByTeamAPI } from "redux/modules/GetEmployeeByTeamReducer/action";
const teamTableColumns = [
  {
    field: "no",
    headerName: "No#",
  },
  {
    field: "name",
    headerName: "Team name",
  },
  {
    field: "detail",
    headerName: "Detail",
  },
];
const employeeTableColumns = [
  {
    field: "no",
    headerName: "No#",
  },
  {
    field: "fullName",
    headerName: "Full name",
  },
  {
    field: "address",
    headerName: "Address",
  },
  {
    field: "phone",
    headerName: "Phone",
  },
  {
    field: "male",
    headerName: "Gender",
  },
];
function TeamPage(props) {
  const teamInfo = useSelector(state=>state.teamReducer.data);
  const employeeByTeam = useSelector(state=>state.getEmployeeByTeamReducer.data);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(actGetTeamAPI());
  }, []);
  const handleDetail = (teamID) => {
    console.log("teamID", teamID);
    dispatch(actGetEmployeeByTeamAPI(teamID))
  };
  const renderTeamTable = () => {
    if (teamInfo) {
      const teamTableRow = teamInfo.map((teamItem) => ({
        no: teamItem.no,
        name: teamItem.name,
        detail: (
          <Button
            onClick={() => {
              handleDetail(teamItem.no);
            }}
          >
            <BadgeOutlinedIcon />
          </Button>
        ),
      }));
      return <DataTable columns={teamTableColumns} rows={teamTableRow} />;
    }
  };
  const renderEmployeeTable = () => {
    if (employeeByTeam) {
      const employeeTableRows = employeeByTeam.map((row) => ({
        no: row.no,
        fullName: row.fullName,
        phone: row.phone,
        address: row.address,
        male: row.male ? "Male" : "Female",
      }));
      return (
        <>
          <Typography>Result all employee team manager - Total {employeeByTeam.length} employees</Typography>
          <DataTable columns={employeeTableColumns} rows={employeeTableRows} />
        </>
      );
    }
  };
  return (
    <Box>
      <Typography>Team</Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        {renderTeamTable()}
      </Box>
      <br />
      {renderEmployeeTable()}
    </Box>
  );
}

export default (TeamPage);
