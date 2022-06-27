import { DatePicker } from "@mui/lab";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actAddWorkingAPI } from "redux/modules/WorkingReducer/action";
import { checkEmpty } from "../../utils/Validations";
import { modalStyled } from "material-ui";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "#fff",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   ".MuiTextField-root": {
//     width: "50%",
//     margin: "0 10px",
//   },
//   ".btn-box": {
//     margin: "10px",
//     button: {
//       marginRight: "10px",
//     },
//   },
// };
function WorkingModal(props) {
  const { open, setOpen } = props;
  const classes = modalStyled();
  const dispatch = useDispatch();
  const employeeID = useParams().id;
  const [working, setWorking] = useState({
    date: "",
    employeeID: employeeID,
    hour: "",
    errors: {
      hour: "",
      hourValid: false,
      frmValid: false,
    },
  });
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
        hourValid = message !== "" ? false : true;
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
    console.log("frmValid", working);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    console.log("working", working);
    dispatch(actAddWorkingAPI(employeeID, working));
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
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                error={working.errors.hour ? true : false}
                label="Hour"
                name="hour"
                type="text"
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
    </>
  );
}
export default WorkingModal;
