import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { actGetWorkingAPI } from "../../redux/modules/GetWorkingReducer/action";
import moment from "moment";
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
  useEffect(() => {
    props.fetchWorkingInfo(employeeID);
  }, []);
  const renderAdvancesInfo = () => {
    if (workingInfo) {
      const workingInfoRows = workingInfo.map((row) => ({
        no: row.no,
        date: moment(row.date).format('DD-MM-YYYY'),
        hour: row.hour,
        option: (
          <Button>
            <DeleteIcon />
          </Button>
        ),
      }));
      return <DataTable rows={workingInfoRows} columns={workingColumns} />;
    }
  };
  return (
    <div style={{ height: 400, width: "100%" }}>{renderAdvancesInfo()}</div>
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
