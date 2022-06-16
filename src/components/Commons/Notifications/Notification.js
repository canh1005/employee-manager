import { Alert, Snackbar } from "@mui/material";
import React from "react";
import propsType from "prop-types";

Notification.propsType = {
  message: propsType.string.isRequired,
  type: propsType.string.isRequired,
  isOpen: propsType.bool.isRequired,
};

function Notification(props) {
  const { notify, setNotify } = props;
  const handleClose = (event) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
}

export default Notification;
