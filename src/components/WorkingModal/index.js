import { DatePicker } from "@mui/lab";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actAddWorkingAPI } from "redux/modules/WorkingReducer/action";
import { checkEmpty } from "../../utils/Validations";
import { modalStyled } from "material-ui";
import queryString from "query-string";
import Notification from "components/Commons/Notifications/Notification";

function WorkingModal(props) {
  //Get data form store and declare a dispatch action
  const employeeInfo = useSelector((state) => state.employeeDetailReducer.data);
  const error = useSelector((state) => state.workingReducer.error);

  const dispatch = useDispatch();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  const { open, setOpen, filter } = props;
  const classes = modalStyled();
  const employeeID = useParams().id;
  const [working, setWorking] = useState({
    date: moment().format("YYYY-MM-DD"),
    employeeID: employeeID,
    hour: "",
    errors: {
      hour: "",
      date: "",
      hourValid: false,
      frmValid: false,
    },
  });

  useEffect(() => {
    console.log("working modal mount!");
    if (error) {
      switch (error.status) {
        case 400:
          setNotify({
            ...notify,
            isOpen: true,
            type: "error",
            message: error && error.data && error.data.message,
          });
          break;
        default:
          setNotify({
            ...notify,
            isOpen: true,
            type: "success",
            message: "Add working success!",
          });
          break;
      }
    }
    return () => {
      console.log("working modal unmount!");
    };
  }, [error]);

  console.log("working", working);
  const handleClose = () => setOpen(false);
  const handleDate = (event) => {
    let formatDate = moment(event).format("YYYY-MM-DD");
    setWorking({
      ...working,
      date: formatDate,
    });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setWorking({
      ...working,
      [name]: value,
    });
  };
  const handleErrors = (event) => {
    const { name, value } = event.target;
    let message = checkEmpty(value);
    let { hourValid } = working.errors;
    switch (name) {
      case "hour":
        if (value > 24) message = "Working hour must be under 24 hours";
        hourValid = message !== "" ? false : true;
        break;
      case "date":
        if (
          moment(value).format("YYYY-MM-DD") <
          moment(employeeInfo.startDay).format("YYYY-MM-DD")
        ) {
          message = "date must be after employee start day";
        }
        break;
      default:
        break;
    }
    setWorking({
      ...working,
      errors: {
        [name]: message,
        hourValid,
        frmValid: hourValid,
      },
    });
  };
  const handleDisableDays = (date) => {
    return (
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      moment(date).format("YYYY-MM-DD") <
        moment(employeeInfo.startDay).format("YYYY-MM-DD")
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    console.log("working", working);
    dispatch(actAddWorkingAPI(queryString.stringify(filter), working));
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} className={classes.root}>
        <Box className={classes.box}>
          <Typography className={classes.title} variant="h4">
            Add working
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className={classes.form}>
              <DatePicker
                label="Date"
                name="date"
                onChange={handleDate}
                value={working.date}
                shouldDisableDate={handleDisableDays}
                renderInput={(params) => (
                  <TextField
                    error={working.errors.hour ? true : false}
                    onBlur={handleErrors}
                    helperText={working.errors.date}
                    {...params}
                  />
                )}
              />
              <TextField
                error={working.errors.hour ? true : false}
                label="Hour"
                name="hour"
                type="number"
                onChange={handleOnChange}
                onBlur={handleErrors}
                helperText={working.errors.hour}
              />
            </Box>
            <Box className={classes.buttonBox}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancle
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!working.errors.frmValid}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
export default WorkingModal;
