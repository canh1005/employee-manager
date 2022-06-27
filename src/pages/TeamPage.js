import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "components/Commons/DataTable";
import { actGetTeamAPI } from "redux/modules/TeamReducer/action";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { actGetEmployeeByTeamAPI } from "redux/modules/GetEmployeeByTeamReducer/action";
import { teamPageStyled } from "material-ui";
import Loading from "components/Commons/Loading";
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
  const teamInfo = useSelector((state) => state.teamReducer.data);
  const employeeByTeam = useSelector(
    (state) => state.getEmployeeByTeamReducer.data
  );
  const loading = useSelector((state) => state.teamReducer.loading);
  const classes = teamPageStyled();
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
    dispatch(actGetEmployeeByTeamAPI(teamID));
  };
  const renderTeamTable = () => {
    if (teamInfo) {
      const teamTableRow = teamInfo.map((teamItem,index) => ({
        no: index + 1,
        name: teamItem.name,
        detail: (
          <Button
            onClick={() => {
              handleDetail(teamItem.id);
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
      const employeeTableRows = employeeByTeam.content.map((row,index) => ({
        no: index + 1,
        fullName: row.fullName,
        phone: row.phone,
        address: row.address,
        male: row.male ? "Male" : "Female",
      }));
      return (
        <>
          <DataTable columns={employeeTableColumns} rows={employeeTableRows} />
        </>
      );
    }
  };
  return (
    <Box className={classes.root}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box>
            <Typography className={classes.title} variant="h5">
              Team
            </Typography>
            {renderTeamTable()}
          </Box>
          <br />
          <Box>
            <Typography className={classes.title} variant="h5">
              Result all employee team manager - Total{" "}
              {employeeByTeam ? employeeByTeam.length : 0} employees
            </Typography>
            {renderEmployeeTable()}
          </Box>
        </>
      )}
    </Box>
  );
}

export default TeamPage;
