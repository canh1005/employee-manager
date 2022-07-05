import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  actDeleteAdvanceAPI,
  actGetAdvancesAPI,
} from "redux/modules/AdvancesReducer/action";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AdvanceModal from "../AdvanceModal";
import DataTable from "components/Commons/DataTable";
import ResponsiveDialog from "components/Commons/Dialog";
import Loading from "components/Commons/Loading";
import { Paginations } from "components/Commons/Pagination";
import queryString from 'query-string'
import Notification from "components/Commons/Notifications/Notification";

const advancesColumns = [
  {
    field: "no",
    headerName: "No#",
  },
  {
    field: "date",
    headerName: "Date",
  },
  {
    field: "money",
    headerName: "Money",
  },
  {
    field: "option",
    headerName: "Option",
  },
];

function EmployeeAdvances() {
  const advancesInfo = useSelector((state) => state.advancesReducer.data);
  const loading = useSelector((state) => state.advancesReducer.loading);
  const error = useSelector((state) => state.advancesReducer.error);
  const dispatch = useDispatch();

  const employeeID = useParams().id;

  const [openModal, setOpenModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "info",
    message: "",
  });
  const [filter, setFilter] = useState({
    page: 0,
  });

  useEffect(() => {
    dispatch(actGetAdvancesAPI(employeeID,filter.page));
    console.log("advances mount!");
    if (error) {
      switch (error.status) {
        case 400:
          setNotify({
            ...notify,
            isOpen: true,
            type: "error",
            message: error.data && error.data.message,
          });
          break;
        case 200:
          setNotify({
            ...notify,
            isOpen: true,
            type: "success",
            message: error.message,
          });
        default:
          break;
      }
    }
  }, [error]);

  const handleOpenDialog = (advances_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Are you sure to delete this advances?",
      onConfirm: () => handleDelete(advances_id),
    });
  };
  const handleDelete = (advances_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(actDeleteAdvanceAPI(advances_id));
  };
  const renderAdvancesInfo = () => {
    if (advancesInfo) {
      const advancesInfoRows = advancesInfo.content.map((row, index) => ({
        no: index,
        date: moment(row.date).format("DD-MM-YYYY"),
        money: row.money,
        option: (
          <Button key={index} onClick={() => handleOpenDialog(row.id)}>
            <DeleteIcon />
          </Button>
        ),
      }));
      return <DataTable rows={advancesInfoRows} columns={advancesColumns} />;
    }
  };
  return (
    <>
      <Tooltip title="Add new advance">
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          <AddCircleOutlineIcon />
        </Button>
      </Tooltip>
      <div style={{ height: 400, width: "100%" }}>
        {loading ? <Loading /> : renderAdvancesInfo()}
      </div>
      <AdvanceModal open={openModal} setOpen={setOpenModal} />
      <ResponsiveDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Paginations
        filter={filter}
        setPage={setFilter}
        numberOfPage={advancesInfo ? advancesInfo.totalPages : 1}
      />
      <Notification notify={notify} setNotify={setNotify}/>
    </>
  );
}
export default EmployeeAdvances;
