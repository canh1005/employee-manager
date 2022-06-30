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
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import Notification from "components/Commons/Notifications/Notification";
import { actAddTeam } from "redux/modules/TeamReducer/addTeamReducer/action";

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
  //Get data form store and declare a dispatch action
  const teamInfo = useSelector((state) => state.teamReducer.data);
  const employeeByTeam = useSelector(
    (state) => state.getEmployeeByTeamReducer.data
  );
  const error = useSelector((state) => state.teamReducer.error);
  // const error = useSelector((state) => state.addTeamReducer.error);
  const loading = useSelector((state) => state.teamReducer.loading);
  const dispatch = useDispatch();
  const [openInput, setOpenInput] = useState(false);

  //Custom style for team page
  const classes = teamPageStyled();

  const [team, setTeam] = useState({
    name: "",
  });
  const [teamFilter, setTeamFilter] = useState({
    page: 0,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    dispatch(actGetTeamPageAPI(teamFilter.page));
    return () => {
      dispatch(actClearTeamData());
    };
  }, [teamFilter]);
  useEffect(() => {
    if (error) {
      if (error.status === 400) {
        setNotify({
          ...notify,
          isOpen: true,
          type: "error",
          message: `${error && error.data ? error.data.message : ""}`,
        });
      } else {
        setNotify({
          ...notify,
          isOpen: true,
          type: "success",
          message: "Add team success",
        });
      }
    }
  }, [error]);

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
      return <DataTable columns={employeeTableColumns} rows={employeeTableRows} />
    }
  };
  //Handle add new team
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("teamSubmit", team);
    dispatch(actAddTeamAPI(team, teamFilter.page));
  };
  const handleAddTeam = () => {
    if (!openInput) {
      setOpenInput(true);
    } else {
      dispatch(actAddTeamAPI(team, teamFilter.page));
    }
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.title} variant="h5">
          Team
          <form onSubmit={handleSubmit}>
            <TextField
              label="Team name"
              name="teamName"
              type="text"
              onChange={(event) => setTeam({ name: event.target.value })}
              sx={{ opacity: `${openInput ? 1 : 0}` }}
            />
            <Tooltip title="Add new team">
              <Button
                variant="contained"
                sx={{ borderRadius: "50%", color: "#fff" }}
                color="primary"
                onClick={handleAddTeam}
              >
                <PersonAddAltRoundedIcon />
              </Button>
            </Tooltip>
          </form>
        </Typography>
        <Typography className={classes.title} variant="h5">
          Result all employee team manager - Total{" "}
          {employeeByTeam ? employeeByTeam.content.length : 0} employees
        </Typography>

      </Box>
      <Box className={classes.bodyContent}>
        <Box>
          {loading ? <Loading /> : <>{renderTeamTable()}</>}
          <Paginations
            filter={teamFilter}
            setPage={setTeamFilter}
            numberOfPage={teamInfo ? teamInfo.totalPages : 1}
          />
        </Box>
        {renderEmployeeTable()}
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}

export default TeamPage;
