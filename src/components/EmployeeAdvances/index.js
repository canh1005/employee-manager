import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { actGetAdvancesAPI } from "../../redux/modules/GetAdvancesReducer/action";
import DataTable from "../DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AdvanceModal from "../AdvanceModal";

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

function EmployeeAdvances(props) {
  const { advancesInfo } = props;
  const employeeID = useParams().id;
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    props.fetchAdvancesInfo(employeeID);
  }, []);
  const renderAdvancesInfo = () => {
    if (advancesInfo) {
      const advancesInfoRows = advancesInfo.map((row) => ({
        no: row.no,
        date: moment(row.date).format("DD-MM-YYYY"),
        money: row.money,
        option: (
          <Button>
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
      <div style={{ height: 400, width: "100%" }}>{renderAdvancesInfo()}</div>
      <AdvanceModal open={openModal} setOpen={setOpenModal} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    advancesInfo: state.getAdvancesReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdvancesInfo: (id) => {
      dispatch(actGetAdvancesAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAdvances);
