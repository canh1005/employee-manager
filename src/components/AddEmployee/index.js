import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { employeeModal } from "../../material-ui";
import { DatePicker } from "@mui/lab";

export default function AddEmployee() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setselectedDate] = useState(null);
  const [gender, setGender] = useState('Male');
  const classes = employeeModal();
  const options = [
    {
      value: "Male",
      label: "Male",
    },
    { value: "Female", label: "Female" },
  ];
  const handleSelectChange = (e) =>{
    setGender(e.target.value);
    console.log('gender', gender);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
  };
  return (
    <>
      <Button onClick={handleOpen}>
        <PersonAddAltRoundedIcon />
        <Typography variant="span">Add employee</Typography>
      </Button>
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
          <form className={classes.form}>
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
              onChange={handleSelectChange}
            >
              {options.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField variant="outlined" type="text" name="age" label="Age" />
            <DatePicker
              label="Start date"
              onChange={(newValue) => {
                setselectedDate(newValue);
              }}
              value={selectedDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              variant="outlined"
              type="text"
              name="moneyperHour"
              label="Money/hour"
            />
            <TextField
              variant="outlined"
              type="text"
              name="phone"
              label="Phone number"
            />
            <Box className={classes.btn}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cancle
              </Button>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
