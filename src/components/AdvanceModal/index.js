import { DatePicker } from "@mui/lab";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actAddAdvanceAPI } from "redux/modules/AdvancesReducer/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  ".MuiTextField-root": {
    width: "50%",
    margin: "0 10px",
  },
  ".btn-box": {
    margin: "10px",
    button: {
      marginRight: "10px",
    },
  },
};
function AdvanceModal(props) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const employeeID = useParams().id;
  const [advance, setAdvance] = useState({
    date: "",
    employee_id: employeeID,
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
    console.log("working", advance);
    dispatch(actAddAdvanceAPI(employeeID, advance));
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add advance
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex" }}>
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
            <Box className="btn-box">
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
