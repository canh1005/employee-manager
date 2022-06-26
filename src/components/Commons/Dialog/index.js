import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ResponsiveDialog({ ...props }) {
  const { confirmDialog, setConfirmDialog } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={confirmDialog.isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {confirmDialog.title}
        </DialogTitle>
        
        <DialogActions>
          <Button
          
            autoFocus
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
          >
            Disagree
          </Button>
          <Button onClick={confirmDialog.onConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(ResponsiveDialog);
