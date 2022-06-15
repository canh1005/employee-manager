import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import { actGetWorkingAPI } from "redux/modules/GetWorkingReducer/action";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorkingModal from "components/WorkingModal";
import ResponsiveDialog from "components/Commons/Dialog";
import DataTable from "components/Commons/DataTable";
import { actDeleteWorkingAPI } from "redux/modules/DeleteWorkingReducer/action";
import Notification from "components/Commons/Notifications/Notification";

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

function EmployeeWorking(props) {
  const { workingInfo } = props;
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
    props.fetchWorkingInfo(employeeID);
  }, []);
  const handleClick = (working_id) => {
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
    // props.fetchDeleteWorking(employeeID, working_id);
    setNotify({
      isOpen: true,
      message: "Delete successful",
      type: "error"
    })
  };
  const renderAdvancesInfo = () => {
    if (workingInfo) {
      const workingInfoRows = workingInfo.map((row) => ({
        no: row.no,
        date: moment(row.date).format("DD-MM-YYYY"),
        hour: row.hour,
        option: (
          <Button>
            <DeleteIcon onClick={() => handleClick(row.no)} />
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
      <div style={{ height: 400, width: "100%" }}>{renderAdvancesInfo()}</div>
      <ResponsiveDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <WorkingModal open={openModal} setOpen={setOpenModal} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    workingInfo: state.getWorkingReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkingInfo: (id) => {
      dispatch(actGetWorkingAPI(id));
    },
    fetchDeleteWorking: (id, working_id) => {
      dispatch(actDeleteWorkingAPI(id, working_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWorking);
