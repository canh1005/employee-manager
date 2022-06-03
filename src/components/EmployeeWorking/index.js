import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import { actGetWorkingAPI } from "../../redux/modules/GetWorkingReducer/action";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ResponsiveDialog from "../Dialog";
import WorkingModal from "../WorkingModal";
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
  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // useEffect(() => {
  //   props.fetchWorkingInfo(employeeID);
  // }, []);
  useMemo(() => props.fetchWorkingInfo(employeeID), [employeeID])
  const handleClick = () => {
    setOpenDelete(true);
  };
  const handleOpenModal = () => {
    setOpenModal(true)
  };
  const renderAdvancesInfo = () => {
    if (workingInfo) {
      const workingInfoRows = workingInfo.map((row) => ({
        no: row.no,
        date: moment(row.date).format("DD-MM-YYYY"),
        hour: row.hour,
        option: (
          <Button>
            <DeleteIcon onClick={handleClick} />
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
        title="Are you sure to delete this working?"
        open={openDelete}
        setOpen={setOpenDelete}
      />
      <WorkingModal open={openModal} setOpen={setOpenModal}/>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWorking);
