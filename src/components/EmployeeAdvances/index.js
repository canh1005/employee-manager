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
  const loading = useSelector(state => state.advancesReducer.loading) 
  const dispatch = useDispatch();
  const employeeID = useParams().id;
  const [openModal, setOpenModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });

  useEffect(() => {
    dispatch(actGetAdvancesAPI(employeeID));
  }, []);

  const handleOpenDialog = (advances_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Are you sure to delete this advances?",
      onConfirm: () => handleDelete(advances_id),
    });
  };
  const handleDelete = (working_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(actDeleteAdvanceAPI(employeeID, working_id));
  };
  const renderAdvancesInfo = () => {
    if (advancesInfo) {
      const advancesInfoRows = advancesInfo.map((row,index) => ({
        no: index,
        date: moment(row.date).format("DD-MM-YYYY"),
        money: row.money,
        option: (
          <Button onClick={() => handleOpenDialog(row.id)}>
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
      <div style={{ height: 400, width: "100%" }}>{loading ? <Loading/> : renderAdvancesInfo()}</div>
      <AdvanceModal open={openModal} setOpen={setOpenModal} />
      <ResponsiveDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
export default EmployeeAdvances;
