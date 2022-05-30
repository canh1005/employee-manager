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

function EmployeeModal(props) {
  const { open, setOpenModal, listTeam } = props;
  const handleClose = () => setOpenModal(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState(true);
  const [team, setTeam] = useState(1);
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
  useEffect(() => {
    props.fetchListTeam();
  }, []);
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setEmployee({
      ...employee,
      male: event.target.value,
    });
  };
  const handleTeamChange = (event) => {
    setTeam(event.target.value);
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
    let formatStartDay = moment(event).format("DD-MM-YYYY");
    setEmployee({
      ...employee,
      startDay: formatStartDay,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
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
            Add new Employee
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              type="text"
              name="fullName"
              label="Full Name"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              type="text"
              name="address"
              label="Address"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              name="sex"
              select
              label="Sex Employee"
              value={gender}
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
              onChange={handleChange}
            />
            <DatePicker
              label="Start date"
              onChange={handleSelectedDate}
              value={selectedDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              variant="outlined"
              type="text"
              name="moneyperHour"
              label="Money/hour"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              type="text"
              name="phone"
              label="Phone number"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              select
              name="team"
              label="Team"
              value={team}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListTeam: () => {
      dispatch(actListTeamAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModal);
