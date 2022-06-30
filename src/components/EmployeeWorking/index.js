import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import {
  actGetWorkingAPI,
  actDeleteWorkingAPI,
} from "redux/modules/WorkingReducer/action";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorkingModal from "components/WorkingModal";
import ResponsiveDialog from "components/Commons/Dialog";
import DataTable from "components/Commons/DataTable";
import Notification from "components/Commons/Notifications/Notification";
import Loading from "components/Commons/Loading";

const workingColumns = [
  {
    field: "no",
    headerName: "No#",
  },
  {
    field: "date",
    headerName: "Date",
  },
  {
    field: "hour",
    headerName: "Hour",
  },
  {
    field: "option",
    headerName: "Option",
  },
];

function EmployeeWorking() {
  //Get data form store and declare a dispatch
  const workingInfo = useSelector((state) => state.workingReducer.data);
  const loading = useSelector((state) => state.workingReducer.loading);
  const error = useSelector((state) => state.workingReducer.error);
  console.log("wError: ",error);

  const dispatch = useDispatch();

  const employeeID = useParams().id;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    dispatch(actGetWorkingAPI(employeeID));
  }, []);
  useEffect(() => {
    if (error) {
      if (error.status === 400) {
        setNotify({
          ...notify,
          isOpen: true,
          type: "error",
          message: error && error.data && error.data.message,
        });
      } else {
        setNotify({
          ...notify,
          isOpen: true,
          type: "success",
          message: "Add working success!",
        });
      }
    }
  }, [error]);

  const handleDeleteDialog = (working_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Are you sure to delete this working?",
      onConfirm: () => handleDelete(working_id),
    });
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleDelete = (working_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(actDeleteWorkingAPI(employeeID, working_id));
    setNotify({
      isOpen: true,
      message: "Delete successful",
      type: "success",
    });
  };
  const renderWorkingInfo = () => {
    if (workingInfo) {
      const workingInfoRows = workingInfo.map((row, index) => ({
        no: index,
        date: moment(row.date).format("DD-MM-YYYY"),
        hour: row.hour,
        option: (
          <Button>
            <DeleteIcon onClick={() => handleDeleteDialog(row.id)} />
          </Button>
        ),
      }));
      return <DataTable rows={workingInfoRows} columns={workingColumns} />;
    }
  };
  return (
    <>
      <Tooltip title="Add new working">
        <Button variant="contained" onClick={handleOpenModal}>
          <AddCircleOutlineIcon />
        </Button>
      </Tooltip>
      <div style={{ height: 400, width: "100%" }}>
        {loading ? <Loading /> : renderWorkingInfo()}
      </div>
      <ResponsiveDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <WorkingModal open={openModal} setOpen={setOpenModal} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
export default EmployeeWorking;
