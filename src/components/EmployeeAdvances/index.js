import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { actGetAdvancesAPI } from "../../redux/modules/GetAdvancesReducer/action";
import DataTable from "../DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import moment from "moment";
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
  useEffect(() => {
    props.fetchAdvancesInfo(employeeID);
  }, []);
  const renderAdvancesInfo = () => {
    if (advancesInfo) {
      const advancesInfoRows = advancesInfo.map((row) => ({
        no: row.no,
        date: moment(row.date).format('DD-MM-YYYY'),
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
    <div style={{ height: 400, width: "100%" }}>{renderAdvancesInfo()}</div>
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
