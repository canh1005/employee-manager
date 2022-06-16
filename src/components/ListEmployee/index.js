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
import { actAddEmployeeAPI, actDeleteEmployeeAPI } from "redux/modules/EmployeeReducer/action";
function ListEmployee() {
  const searchList = useSelector((state) => state.searchReducer.data);
  const getTeam = useSelector((state) => state.teamReducer.data);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    
  });
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    name: "",
  });
  console.log("Checked", selected);

  useEffect(() => {
    const paramsString = queryString.stringify(filter);
    dispatch(actSearchAPI(paramsString));
    dispatch(actGetTeamAPI());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const navigate = useNavigate();

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
      const checkedAll = searchList.content.map((item) => item.no.toString());
      setSelected(checkedAll);
    } else {
      setSelected([]);
    }
  };

  const handleEmployeeDetail = (employee) => {
    navigate(`${employee.no}`, { replace: true });
  };
  const handleKeywordChange = (keyword) => {
    setFilter({
      ...filter,
      name: keyword,
      page: 1,
    });
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
        field: "no",
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
      const rows = searchList.content.map((employee) => ({
        checkBox: (
          <Checkbox
            onClick={handleSelect}
            name={employee.no.toString()}
            checked={selected.indexOf(employee.no.toString()) !== -1}
          />
        ),
        phone: employee.phone,
        fullName: employee.fullName,
        no: employee.no,
        team: getTeam
          ? getTeam.find((item) => item.no === employee.teamID).name
          : "",
        option: (
          <>
            <Tooltip title="Employee information">
              <Button onClick={() => handleEmployeeDetail(employee)}>
                <InfoOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Delete employee">
              <Button>
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
    dispatch(actDeleteEmployeeAPI(queryString.stringify(selectedObj)));
  };
  return (
    <Box>
      <SearchFrom onSubmit={handleKeywordChange} />
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
      <Typography>List of employee</Typography>
      <EmployeeModal open={openModal} setOpenModal={setOpenModal} />
      {renderEmployeeTable()}
      <Paginations
        filter={filter}
        setPage={setFilter}
        numberOfPage={searchList ? searchList.totalPages : 1}
      />
    </Box>
  );
}
export default ListEmployee;
