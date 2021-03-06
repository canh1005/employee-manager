import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "components/Commons/DataTable";
import {
  actAddTeamAPI,
  actClearTeamData,
  actGetTeamPageAPI,
  actSelectedTeamData,
} from "redux/modules/TeamReducer/action";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import {
  actGetEmployeeByTeamAPI,
  actGetEmployeeByTeamFirstLoad,
} from "redux/modules/GetEmployeeByTeamReducer/action";
import { teamPageStyled } from "material-ui";
import Loading from "components/Commons/Loading";
import { Paginations } from "components/Commons/Pagination";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import Notification from "components/Commons/Notifications/Notification";

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
  const loading = useSelector((state) => state.teamReducer.loading);
  const selectedTeam = useSelector((state) => state.teamReducer.selectedTeam);
  const selectedFirstTeam = useSelector(
    (state) => state.teamReducer.selectedFirstTeam
  );
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
  const [employeeByTeamFilter, setEmployeeByTeamFilter] = useState({
    page: 0,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    dispatch(actGetTeamPageAPI(teamFilter.page, employeeByTeamFilter.page));
    return () => {
      dispatch(actClearTeamData());
    };
  }, [teamFilter]);
  useEffect(() => {
    if (selectedTeam) {
      dispatch(
        actGetEmployeeByTeamAPI(selectedTeam.id, employeeByTeamFilter.page)
      );
    }
  }, [employeeByTeamFilter, selectedTeam]);
  useEffect(() => {
    if (selectedFirstTeam) {
      dispatch(
        actGetEmployeeByTeamAPI(selectedFirstTeam.id, employeeByTeamFilter.page)
      );
    }
  }, [selectedFirstTeam]);
  useEffect(() => {
    if (error) {
      if (error.status === 400) {
        setNotify({
          ...notify,
          isOpen: true,
          type: "error",
          message: error && error.data && error.data.message,
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

  const handleDetail = (team) => {
    dispatch(actGetEmployeeByTeamAPI(team.id, employeeByTeamFilter.page));
    dispatch(actSelectedTeamData(team));
  };

  const renderTeamTable = () => {
    if (teamInfo && teamInfo.content) {
      const teamTableRow = teamInfo.content.map((teamItem, index) => ({
        no: index + 1,
        name: teamItem.name,
        detail: (
          <Button
            onClick={() => {
              handleDetail(teamItem);
            }}
          >
            <BadgeOutlinedIcon />
          </Button>
        ),
      }));
      return (
        <DataTable
          columns={teamTableColumns}
          rows={teamTableRow}
          size={teamInfo.size}
          rowsPerPage={teamInfo.numberOfElements}
          lastPage={teamInfo.last}
        />
      );
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
        <DataTable
          columns={employeeTableColumns}
          rows={employeeTableRows}
          size={employeeByTeam.size}
          rowsPerPage={employeeByTeam.numberOfElements}
          lastPage={employeeByTeam.last}
        />
      );
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
          Result all employee{" "}
          {selectedTeam === "" ? selectedFirstTeam.name : selectedTeam.name}{" "}
          team - Total {employeeByTeam ? employeeByTeam.totalElements : 0}{" "}
          employees
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
        <Box>
          {renderEmployeeTable()}
          <Paginations
            filter={employeeByTeamFilter}
            setPage={setEmployeeByTeamFilter}
            numberOfPage={employeeByTeam ? employeeByTeam.totalPages : 1}
          />
        </Box>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}

export default TeamPage;
