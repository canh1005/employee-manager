import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actEmployeeDetailAPI,
  actEmployeeDetailClear,
  actEmployeeEdited,
} from "redux/modules/EmployeeDetailReducer/action";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Input,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { employeeDetail } from "material-ui";
import EmployeeModal from "components/EmployeeModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ResponsiveDialog from "../../Commons/Dialog";
import AddImageModal from "components/AddImageModal";
import { actGetTeamAPI } from "redux/modules/TeamReducer/action";
import { actDeleteEmployeeAPI } from "redux/modules/EmployeeReducer/action";
import Notification from "components/Commons/Notifications/Notification";
import Loading from "components/Commons/Loading";

function EmployeeInfoDetail() {
  const employeeInfo = useSelector((state) => state.employeeDetailReducer.data);
  const error = useSelector((state) => state.employeeDetailReducer.error);
  const imgLoading = useSelector((state) => state.imageReducer.loading);
  const employeeFilter = useSelector(
    (state) => state.employeeReducer.employee_filter
  );
  const dispatch = useDispatch();

  const employeeId = useParams().id;
  const navigate = useNavigate();
  const classes = employeeDetail();
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "info",
    message: "",
  });
  const [openEditModel, setOpenEditModel] = useState({
    isOpen: false,
  });
  const [openAddImgModal, setOpenAddImgModal] = useState({
    isOpen: false,
  });

  useEffect(() => {
    dispatch(actEmployeeDetailAPI(employeeId));
    dispatch(actGetTeamAPI());
    navigate("info", { replace: true });
    return () => {
      dispatch(actEmployeeEdited(null));
      dispatch(actEmployeeDetailClear());
    };
  }, []);
  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 400:
          setNotify({
            ...notify,
            type: "error",
            message: error.data && error.data.message,
            isOpen: true,
          });
          break;
        case 200:
          setNotify({
            ...notify,
            type: "success",
            message: error && error.message,
            isOpen: true,
          });
          break;
        default:
          break;
      }
    }
  }, [error]);

  const renderEmployeeInfo = () => {
    if (employeeInfo) {
      return (
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">{employeeInfo.fullName}</Typography>
          <Box>
            <Box component="p">
              <Typography variant="span">No.:</Typography>
              <Typography variant="span">{employeeInfo.id}</Typography>
            </Box>
            <Box component="p">
              <Typography variant="span">Age:</Typography>
              <Typography variant="span">{employeeInfo.age}</Typography>
            </Box>
            <Box component="p">
              <Typography variant="span">Gender:</Typography>
              <Typography variant="span">
                {employeeInfo.male ? "Male" : "Female"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      );
    }
  };
  const handleEditModel = () => {
    setOpenEditModel({
      isOpen: true,
    });
    dispatch(actEmployeeEdited(employeeInfo));
  };
  const handleDeleteDialog = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this employee?",
      onConfirm: () => handleDelete(employeeId),
    });
  };
  const handleDelete = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // dispatch(actDeleteEmployeeAPI(`ids=${employeeId}`, employeeFilter));
    dispatch(actDeleteEmployeeAPI(`ids=${employeeId}`, "", navigate));
  };
  return (
    <>
      <Card className={classes.card}>
        <Box className={classes.imgBox}>
          <Button
            className={classes.imgButton}
            component="label"
            onClick={() => setOpenAddImgModal({ isOpen: true })}
          >
            {imgLoading ? (
              <Box style={{ position: "absolute", top: 0, left: "-50px" }}>
                <Loading />
              </Box>
            ) : (
              <>
                <Avatar
                  className={classes.img}
                  alt={employeeInfo ? `${employeeInfo.fullName} avatar` : ""}
                  src={employeeInfo ? employeeInfo.imgName : ""}
                />
                <Typography variant="span" className={classes.imgOverlay}>
                  Upload Photo
                </Typography>
              </>
            )}
          </Button>
        </Box>
        <Box className={classes.employeeInfoBtn}>
          <Button variant="contained" onClick={handleEditModel} color="primary">
            <ModeEditIcon />
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteDialog}
            color="error"
          >
            <DeleteIcon />
          </Button>
        </Box>
        {renderEmployeeInfo()}
      </Card>
      <EmployeeModal open={openEditModel} setOpenModal={setOpenEditModel} />
      <ResponsiveDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <AddImageModal open={openAddImgModal} setOpen={setOpenAddImgModal} />
    </>
  );
}

export default EmployeeInfoDetail;
