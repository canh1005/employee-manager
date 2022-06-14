import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EmployeeModal from "../EmployeeModal";
import { Paginations } from "components/Commons/Pagination";
import SearchFrom from "components/Commons/Search";
import {
  actGetKeyword,
  actSearchAPI,
} from "redux/modules/SearchEmployeeReducer/action";
import queryString from "query-string";
function ListEmployee(props) {
  const { searchList } = props;
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({ ids: [] });
  const [filter, setFilter] = useState({
    page: 1,
    name: "",
  });

  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);

  const handleSelect = (e) => {
    const { name, checked } = e.target;
    if (checked && name === "selectAll") {
      let checkedAll = searchList.content.map((item) => {
        return item.no;
      });
      setSelected((prevs) => ({
        ...prevs,
        ids: [...selected.ids, checkedAll], 
      }));
      let obj = {
        ids: checkedAll
      }
    console.log("checked", queryString.stringify(obj));

      console.log(obj);
    } else {
      setSelected((prevs) => ({
        ...prevs,
        ids: [...selected.ids, name],
      }));
    }
    const params = queryString.stringify(selected);
    console.log("selected",selected);
    console.log("check", params);
  };

  useEffect(() => {
    const paramsString = queryString.stringify(filter);
    props.fetchListSearched(paramsString);
    console.log("filter", filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
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
  const renderListEmployee = () => {
    if (searchList) {
      {
        return searchList.content.map((employee) => {
          return (
            <TableRow
              key={employee.no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  onClick={(event) => handleSelect(event)}
                  name={employee.no}
                  checked={selected.checked}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {employee.no}
              </TableCell>
              <TableCell align="right">{employee.fullName}</TableCell>
              <TableCell align="right">{employee.age}</TableCell>
              <TableCell align="right">{employee.address}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          );
        });
      }
    }
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
      </Box>
      <Typography>List of employee</Typography>
      <EmployeeModal open={openModal} setOpenModal={setOpenModal} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  name="selectAll"
                  onChange={handleSelect}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              <TableCell>No#</TableCell>
              <TableCell align="right">FullName</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Team</TableCell>
              <TableCell align="center">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderListEmployee()}</TableBody>
        </Table>
      </TableContainer>
      <Paginations
        filter={filter}
        setPage={setFilter}
        numberOfPage={searchList ? searchList.totalPages : 1}
      />
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    searchList: state.searchReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListSearched: (filter) => {
      dispatch(actSearchAPI(filter));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListEmployee);
