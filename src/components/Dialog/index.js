import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Slide } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { actDeleteEmployeeAPI } from "../../redux/modules/DeleteEmployeeReducer/action";
import { connect } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ResponsiveDialog(props) {
  const { open, setOpen } = props;
  const employeeID = useParams().id;
  const navigate = useNavigate();
  console.log("e", employeeID);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    console.log(employeeID);
    navigate("/", { replace: true });
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure to delete this employee?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Will be delete all data from this employee
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fecthDeleteEmployee: (id) => {
      dispatch(actDeleteEmployeeAPI(id));
    },
  };
};
export default connect(null, mapDispatchToProps)(React.memo(ResponsiveDialog));
