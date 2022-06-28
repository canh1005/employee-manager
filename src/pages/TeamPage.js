import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "components/Commons/DataTable";
import {
  actAddTeamAPI,
  actClearTeamData,
  actGetTeamPageAPI,
} from "redux/modules/TeamReducer/action";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { actGetEmployeeByTeamAPI } from "redux/modules/GetEmployeeByTeamReducer/action";
import { teamPageStyled } from "material-ui";
import Loading from "components/Commons/Loading";
import { Paginations } from "components/Commons/Pagination";
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
function TeamPage() {
  const teamInfo = useSelector((state) => state.teamReducer.data);
  const employeeByTeam = useSelector(
    (state) => state.getEmployeeByTeamReducer.data
  );
  const loading = useSelector((state) => state.teamReducer.loading);
  const classes = teamPageStyled();
  const dispatch = useDispatch();
  const [team, setTeam] = useState({
    name: "",
  });
  const [teamFilter, setTeamFilter] = useState({
    page: 0,
  });
  console.log("team", team);
  useEffect(() => {
    dispatch(actGetTeamPageAPI(teamFilter.page));
    // return () => {
    //   dispatch(actClearTeamData());
    // };
  }, [teamFilter]);
  const handleDetail = (teamID) => {
    dispatch(actGetEmployeeByTeamAPI(teamID));
  };
  const renderTeamTable = () => {
    if (teamInfo && teamInfo.content) {
      const teamTableRow = teamInfo.content.map((teamItem, index) => ({
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
      const employeeTableRows = employeeByTeam.content.map((row, index) => ({
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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("teamSubmit", team);
    dispatch(actAddTeamAPI(team, teamFilter.page));
  };
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.title} variant="h5">
          Team
          <form onSubmit={handleSubmit}>
            <TextField
              label="Team name"
              name="teamName"
              type="text"
              onChange={(event) => setTeam({ name: event.target.value })}
            />
            <Tooltip title="Add new team">
              <Button variant="contained" color="primary">
                Add
              </Button>
            </Tooltip>
          </form>
        </Typography>

        {loading ? <Loading /> : <>{renderTeamTable()}</>}

        <Paginations
          filter={teamFilter}
          setPage={setTeamFilter}
          numberOfPage={teamInfo ? teamInfo.totalPages : 1}
        />
      </Box>
      <Box>
        <Typography className={classes.title} variant="h5">
          Result all employee team manager - Total{" "}
          {employeeByTeam ? employeeByTeam.content.length : 0} employees
        </Typography>
        {renderEmployeeTable()}
      </Box>
    </Box>
  );
}

export default TeamPage;
