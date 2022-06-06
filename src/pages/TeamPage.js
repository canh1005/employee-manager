import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import DataTable from "../components/DataTable";
import { actGetTeamAPI } from "../redux/modules/GetTeamReducer/action";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { actGetEmployeeByTeamAPI } from "../redux/modules/GetEmployeeByTeamReducer/action";
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
  const { teamInfo, employeeByTeam } = props;
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    props.fetchTeam();
  }, []);
  const handleDetail = (teamID) => {
    console.log("teamID", teamID);
    props.fetchEmployeeByTeam(teamID);
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
const mapStateToProps = (state) => {
  return {
    teamInfo: state.getTeamReducer.data,
    employeeByTeam: state.getEmployeeByTeamReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeam: () => {
      dispatch(actGetTeamAPI());
    },
    fetchEmployeeByTeam: (teamID) => {
      dispatch(actGetEmployeeByTeamAPI(teamID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
