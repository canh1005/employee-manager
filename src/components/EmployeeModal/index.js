import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { employeeModal } from "../../material-ui";
import { DatePicker } from "@mui/lab";
import moment from "moment";
import { connect } from "react-redux";
import { actListTeamAPI } from "../../redux/modules/ListAllTeamReducer/action";
import { actAddEmployeeAPI } from "../../redux/modules/AddEmployeeReducer/action";
import { useNavigate } from "react-router-dom";

function EmployeeModal(props) {
  const { open, setOpenModal, listTeam, employeeEdit } = props;
  const handleClose = () => setOpenModal(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const classes = employeeModal();
  const genderOptions = [
    {
      value: true,
      label: "Male",
    },
    { value: false, label: "Female" },
  ];
  const [employee, setEmployee] = useState({
    fullName: "",
    age: "",
    address: "",
    moneyPerHour: "",
    phone: "",
    startDay: "",
    male: true,
    teamID: 1,
  });
  const navigate = useNavigate();
  useEffect(() => {
    props.fetchListTeam();
    if (props.employeeEdit) {
      setEmployee({
        fullName: employeeEdit.fullName,
        age: employeeEdit.age,
        address: employeeEdit.address,
        moneyPerHour: employeeEdit.moneyPerHour,
        phone: employeeEdit.phone,
        startDay: employeeEdit.startDay,
        male: employeeEdit.male,
        teamID: employeeEdit.teamID,
      });
    } else {
      setEmployee({
        fullName: "",
        age: "",
        address: "",
        moneyPerHour: "",
        phone: "",
        startDay: "",
        male: true,
        teamID: 1,
      });
    }
  }, [employeeEdit]);
  const handleGenderChange = (event) => {
    setEmployee({
      ...employee,
      male: event.target.value,
    });
  };
  const handleTeamChange = (event) => {
    setEmployee({
      ...employee,
      teamID: event.target.value,
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const handleSelectedDate = (event) => {
    setSelectedDate(event);
    let formatStartDay = moment(event).format("YYYY-MM-DD");
    setEmployee({
      ...employee,
      startDay: formatStartDay,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // props.fetchAddEmploye(employee);
    // navigate("/", { replace: true });
    console.log("employeeInfo", employee);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.root}
      >
        <Box className={classes.box}>
          <Typography variant="h3" className={classes.title}>
            {employeeEdit ? "Update Employee" : "Add new Employee"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              type="text"
              name="fullName"
              label="Full Name"
              value={employee.fullName}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              type="text"
              name="address"
              label="Address"
              value={employee.address}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              name="sex"
              select
              label="Sex Employee"
              value={employee.male}
              onChange={handleGenderChange}
            >
              {genderOptions.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              variant="outlined"
              type="text"
              name="age"
              label="Age"
              value={employee.age}
              onChange={handleChange}
            />
            <DatePicker
              label="Start date"
              onChange={handleSelectedDate}
              value={employeeEdit ? employee.startDay : selectedDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              variant="outlined"
              type="text"
              name="moneyPerHour"
              label="Money/hour"
              value={employee.moneyPerHour}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              type="text"
              name="phone"
              label="Phone number"
              value={employee.phone}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              select
              name="team"
              label="Team"
              value={employee.teamID}
              onChange={handleTeamChange}
            >
              {listTeam ? (
                listTeam.map((item) => {
                  return (
                    <MenuItem key={item.no} value={item.no}>
                      {item.name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem></MenuItem>
              )}
            </TextField>
            <Box className={classes.buttonBox}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cancle
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    listTeam: state.listAllTeamReducer.data,
    employeeEdit: state.updateEmployeeReducer.userEdited,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListTeam: () => {
      dispatch(actListTeamAPI());
    },
    fetchAddEmploye: (employee) => {
      dispatch(actAddEmployeeAPI(employee));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModal);
