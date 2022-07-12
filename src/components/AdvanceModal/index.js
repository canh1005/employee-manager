import { DatePicker } from "@mui/lab";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actAddAdvanceAPI } from "redux/modules/AdvancesReducer/action";
import { modalStyled } from "material-ui";


function AdvanceModal(props) {
  const { open, setOpen, filter } = props;
  const classes = modalStyled();
  const dispatch = useDispatch();
  const employeeID = useParams().id;
  const [advance, setAdvance] = useState({
    date: moment().format("YYYY-MM-DD"),
    employeeID: employeeID,
    money: "",
  });
  
  const handleClose = () => setOpen(false);
  const handleDate = (event) => {
    let formatDate = moment(event).format("YYYY-MM-DD");
    setAdvance({
      ...advance,
      date: formatDate,
    });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAdvance({
      ...advance,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    dispatch(actAddAdvanceAPI( advance, employeeID, filter.page));
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} className={classes.root}>
        <Box className={classes.box}>
          <Typography className={classes.title} variant="h4" >
            Add advance
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className={classes.form}>
              <DatePicker
                label="Date"
                name="date"
                onChange={handleDate}
                value={advance.date}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                label="Money"
                name="money"
                type="text"
                onChange={handleOnChange}
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
export default AdvanceModal;
