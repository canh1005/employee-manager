import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/lab";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  actAddEmployeeAPI,
  actUpdateEmployeeAPI,
} from "redux/modules/EmployeeReducer/action";
import {
  checkAge,
  checkEmpty,
  checkIsNumber,
  checkPhoneNumber,
  checkPositiveNumber,
} from "utils/Validations";
import queryString from "query-string";
import { modalStyled } from "material-ui";
import { actUpdateEmployee } from "redux/modules/EmployeeDetailReducer/action";
import { useParams } from "react-router-dom";

function EmployeeModal(props) {
  const { open, setOpenModal } = props;
  const employeeID = useParams().id;
  const listTeam = useSelector((state) => state.teamReducer.data);
  const employeeEdit = useSelector(
    (state) => state.employeeDetailReducer.userEdited
  );
  const dispatch = useDispatch();
  const handleClose = () =>
    setOpenModal({
      ...open,
      isOpen: false,
    });
  const classes = modalStyled();
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
    startDay: moment().format("YYYY-MM-DD"),
    male: true,
    teamID: 1,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    age: "",
    address: "",
    moneyPerHour: "",
    phone: "",
    frmSubmit: {
      fullNameValid: false,
      ageValid: false,
      addressValid: false,
      moneyPerHourValid: false,
      phoneValid: false,
      frmValid: false,
    },
  });
  useEffect(() => {
    console.log("employee modal mount!");
    if (employeeEdit) {
      setEmployee({
        id: employeeID,
        fullName: employeeEdit.fullName,
        age: employeeEdit.age,
        address: employeeEdit.address,
        moneyPerHour: employeeEdit.moneyPerHour,
        phone: employeeEdit.phone,
        startDay: employeeEdit.startDay,
        male: employeeEdit.male,
        teamID: employeeEdit.teamID,
      });
      setErrors({
        frmSubmit: {
          fullNameValid: true,
          ageValid: true,
          addressValid: true,
          moneyPerHourValid: true,
          phoneValid: true,
          frmValid: true,
        },
      });
    }
    return () => {
      setEmployee({
        fullName: "",
        age: "",
        address: "",
        moneyPerHour: "",
        phone: "",
        startDay: moment().format("YYYY-MM-DD"),
        male: true,
        teamID: 1,
      });
      setErrors({
        frmSubmit: {
          fullNameValid: false,
          ageValid: false,
          addressValid: false,
          moneyPerHourValid: false,
          phoneValid: false,
          frmValid: false,
        },
      });
      console.log("employee modal unmount!");
    };
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
    let formatStartDay = moment(event).format("YYYY-MM-DD");
    setEmployee({
      ...employee,
      startDay: formatStartDay,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (employeeEdit) {
      dispatch(actUpdateEmployee(employee, employeeID));
    } else {
      dispatch(actAddEmployeeAPI(employee, queryString.stringify(open.filter)));
    }
    setOpenModal({
      ...open,
      isOpen: false,
    });
    console.log("employeeInfo", employee);
  };
  const handleError = (event) => {
    const { name, value } = event.target;
    let message = checkEmpty(value);
    let {
      fullNameValid,
      ageValid,
      addressValid,
      phoneValid,
      moneyPerHourValid,
    } = errors.frmSubmit;
    switch (name) {
      case "fullName":
        fullNameValid = message !== "" ? false : true;
        break;
      case "age":
        if (value !== "") {
          message = checkIsNumber(value);
          message = checkAge(value);
          ageValid = message !== "" ? false : true;
        }
        break;
      case "address":
        addressValid = message !== "" ? false : true;
        break;
      case "phone":
        if (value !== "") {
          message = checkPhoneNumber(value);
          phoneValid = message !== "" ? false : true;
        }
        break;
      case "moneyPerHour":
        if (value !== "") {
          message = checkPositiveNumber(value);
          moneyPerHourValid = message !== "" ? false : true;
        }
        break;

      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: message,
      frmSubmit: {
        ageValid,
        fullNameValid,
        phoneValid,
        moneyPerHourValid,
        addressValid,
        frmValid:
          ageValid &&
          fullNameValid &&
          phoneValid &&
          moneyPerHourValid &&
          addressValid,
      },
    });
  };
  return (
    <>
      <Modal
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.root}
      >
        <Box className={classes.box}>
          <Typography variant="h3" className={classes.title}>
            {employeeEdit ? "Update Employee" : "Add new Employee"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className={classes.form}>
              <TextField
                error={errors.fullName ? true : false}
                variant="outlined"
                type="text"
                name="fullName"
                label="Full Name"
                value={employee.fullName}
                onChange={handleChange}
                onBlur={handleError}
                helperText={errors.fullName}
              />
              <TextField
                error={errors.address ? true : false}
                variant="outlined"
                type="text"
                name="address"
                label="Address"
                value={employee.address}
                onChange={handleChange}
                onBlur={handleError}
                helperText={errors.address}
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
                error={errors.age ? true : false}
                variant="outlined"
                type="number"
                name="age"
                label="Age"
                value={employee.age}
                onChange={handleChange}
                onBlur={handleError}
                helperText={errors.age}
              />
              <DatePicker
                label="Start date"
                onChange={handleSelectedDate}
                value={
                  employeeEdit
                    ? employee.startDay
                    : moment().format("YYYY-MM-DD")
                }
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                error={errors.moneyPerHour ? true : false}
                variant="outlined"
                type="text"
                name="moneyPerHour"
                label="Money/hour"
                value={employee.moneyPerHour}
                onChange={handleChange}
                onBlur={handleError}
                helperText={errors.moneyPerHour}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <TextField
                error={errors.phone ? true : false}
                variant="outlined"
                type="text"
                name="phone"
                label="Phone number"
                value={employee.phone}
                onChange={handleChange}
                onBlur={handleError}
                helperText={errors.phone}
              />
              <TextField
                variant="outlined"
                select
                name="team"
                label="Team"
                onChange={handleTeamChange}
                defaultValue={employeeEdit ? employeeEdit.teamID : 1}
              >
                {listTeam &&
                  listTeam.length > 0 &&
                  listTeam.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Box>
            <Box className={classes.buttonBox}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cancle
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!errors.frmSubmit.frmValid}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default EmployeeModal;
