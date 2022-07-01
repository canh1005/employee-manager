import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import {
  actDeleteWorkingAPI,
  actClearData,
  actGetWorkingPageAPI,
} from "redux/modules/WorkingReducer/action";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorkingModal from "components/WorkingModal";
import ResponsiveDialog from "components/Commons/Dialog";
import DataTable from "components/Commons/DataTable";
import Loading from "components/Commons/Loading";
import { Paginations } from "components/Commons/Pagination";
import queryString from "query-string";

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

  const dispatch = useDispatch();

  const employeeID = useParams().id;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const [filter, setFilter] = useState({
    page: 0,
    employee_id: employeeID,
  });

  const [openModal, setOpenModal] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    dispatch(actGetWorkingPageAPI(queryString.stringify(filter)));
    return () => {
      dispatch(actClearData());
    };
  }, [filter]);

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
    dispatch(actDeleteWorkingAPI(queryString.stringify(filter), working_id));
    setNotify({
      isOpen: true,
      message: "Delete successful",
      type: "success",
    });
  };
  const renderWorkingInfo = () => {
    if (workingInfo && workingInfo.content) {
      const workingInfoRows = workingInfo.content.map((row, index) => ({
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
      {openModal && (
        <WorkingModal open={openModal} setOpen={setOpenModal} filter={filter} />
      )}
      {workingInfo && (
        <Paginations
          filter={filter}
          setPage={setFilter}
          numberOfPage={workingInfo && workingInfo.totalPages}
        />
      )}
    </>
  );
}
export default EmployeeWorking;
