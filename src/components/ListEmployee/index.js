import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Tooltip, Typography } from "@mui/material";
import EmployeeModal from "../EmployeeModal";
import { Paginations } from "components/Commons/Pagination";
import SearchFrom from "components/Commons/Search";
import { actSearchAPI } from "redux/modules/SearchEmployeeReducer/action";
import queryString from "query-string";
import DataTable from "components/Commons/DataTable";
import { actGetTeamAPI } from "redux/modules/TeamReducer/action";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  actClearData,
  actDeleteEmployeeAPI,
  actListPageEmployeeAPI,
} from "redux/modules/EmployeeReducer/action";
import { listEmpStyled } from "material-ui";
import Loading from "components/Commons/Loading";
import ResponsiveDialog from "components/Commons/Dialog";
import Notification from "components/Commons/Notifications/Notification";
function ListEmployee() {
  //Style of list employee
  const classes = listEmpStyled();
  //Get data form store and declare a dispatch action
  const loading = useSelector((state) => state.searchReducer.loading);
  const searchList = useSelector((state) => state.searchReducer.data);
  const getTeam = useSelector((state) => state.teamReducer.data);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.employeeReducer.error);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState({
    isOpen: false,
  });
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState({
    page: 0,
    name: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    const paramsString = queryString.stringify(filter);
    dispatch(actListPageEmployeeAPI(paramsString));
    dispatch(actGetTeamAPI());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("list employee mount!");
    return () => {
      console.log("list employee unmount!");
      dispatch(actClearData());
    };

  }, [filter]);

  useEffect(() => {
    if (error) {
      if (error.status === 400) {
        setNotify({
          isOpen: true,
          type: "error",
          message: error.data && error.data.message,
        });
      } else if (error.status === 200) {
        setNotify({
          isOpen: true,
          type: "success",
          message: "Add employee success",
        });
      }
    }

  }, [error]);


  const handleOpenModal = () =>
    setOpenModal({
      isOpen: true,
      filter: filter,
    });

  const handleSelect = (e) => {
    const { name } = e.target;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const checkedAll = searchList.content.map((item) => item.id.toString());
      setSelected(checkedAll);
    } else {
      setSelected([]);
    }
  };

  const handleEmployeeDetail = (employee) => {
    navigate(`${employee.id}`, { replace: true });
  };

  const handleKeywordChange = (keyword) => {
    setFilter({
      ...filter,
      name: keyword,
      page: 0,
    });
  };

  const handleDeleteDialog = (employee_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Are you sure to delete this employee!",
      onConfirm: () => handleDeleteConfirm(employee_id),
    });
  };

  const handleDeleteConfirm = (employee_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log("employee_id", employee_id);
    dispatch(
      actDeleteEmployeeAPI(`ids=${employee_id}`, queryString.stringify(filter))
    );
  };

  const renderEmployeeTable = () => {
    const columns = [
      {
        field: "checkBox",
        headerName: (
          <Checkbox
            name="selectAll"
            onChange={handleSelectAll}
            checked={
              selected.length ===
              (searchList ? searchList.numberOfElements : "")
            }
          />
        ),
      },
      {
        field: "id",
        headerName: "No#",
      },
      {
        field: "fullName",
        headerName: "Full Name",
      },
      {
        field: "phone",
        headerName: "Phone",
      },
      {
        field: "team",
        headerName: "Team",
      },
      {
        field: "option",
        headerName: "Option",
      },
    ];
    if (searchList) {
      const rows = searchList.content.map((employee, index) => ({
        checkBox: (
          <Checkbox
            onClick={handleSelect}
            name={employee.id.toString()}
            checked={selected.indexOf(employee.id.toString()) !== -1}
          />
        ),
        phone: employee.phone,
        fullName: employee.fullName,
        id: index + 1,
        team:
          getTeam && getTeam.length > 0
            ? getTeam.find((item) => item.id === employee.teamID).name
            : "",
        option: (
          <>
            <Tooltip title="Employee information">
              <Button onClick={() => handleEmployeeDetail(employee)}>
                <InfoOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Delete employee">
              <Button onClick={() => handleDeleteDialog(employee.id)}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          </>
        ),
      }));
      return <DataTable columns={columns} rows={rows} />;
    }
  };

  const handleDeleteSelected = () => {
    let selectedObj = {
      ids: selected,
    };
    console.log("Check", queryString.stringify(selectedObj));
    dispatch(actDeleteEmployeeAPI(queryString.stringify(selectedObj)), queryString.stringify(filter));
  };

  return (
    <Box className={classes.root}>
      <SearchFrom onSubmit={handleKeywordChange} />
      <Box className={classes.toolBox}>
        <Typography variant="h4">List of employee</Typography>
        <Box>
          <Tooltip title="Add new employee">
            <Button onClick={handleOpenModal} variant="contained">
              <PersonAddAltRoundedIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Delete selected employee">
            <Typography variant="span">
              <Button
                onClick={handleDeleteSelected}
                variant="contained"
                disabled={selected.length < 2 ? true : false}
              >
                <DeleteRoundedIcon />
              </Button>
            </Typography>
          </Tooltip>
        </Box>
      </Box>

      <EmployeeModal open={openModal} setOpenModal={setOpenModal} />
      {loading ? <Loading /> : renderEmployeeTable()}
      <Paginations
        filter={filter}
        setPage={setFilter}
        numberOfPage={searchList ? searchList.totalPages : 1}
      />
      <ResponsiveDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}
export default ListEmployee;
