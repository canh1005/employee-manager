import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { employeeDetail } from "../../material-ui";
import { actEmployeeDetailAPI } from "../../redux/modules/EmployeeDetailReducer/action";
import { actGetImageAPI } from "../../redux/modules/GetImageReducer/action";
import EmployeeDetailTabs from "../EmployeeDetailTabs";

function EmployeeDetail(props) {
  const { employeeInfo, imageInfo } = props;
  const location = useParams();
  const employeeId = location.id;
  const classes = employeeDetail();
  useEffect(() => {
    props.fetchEmployeeInfo(employeeId);
    props.fetchImage(employeeId);
  }, []);
  const renderEmployeeInfo = () => {
    if (employeeInfo) {
      return (
        <>
          <CardContent className={classes.cardContent}>
            <Box component="p">
              <Typography variant="span">No.:</Typography>
              <Typography variant="span">{employeeInfo.no}</Typography>
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
          </CardContent>
        </>
      );
    }
  };
  return (
    <Box>
      <Card className={classes.card}>
        <Box className={classes.img}>
          <CardMedia
            component="img"
            image={
              imageInfo && imageInfo.status === 400
                ? "https://employee-management-147.herokuapp.com/api/image/35"
                : ""
            }
          />
        </Box>
        {renderEmployeeInfo()}
      </Card>
      {employeeInfo ? <EmployeeDetailTabs employeeInfo={employeeInfo} /> : ""}
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    employeeInfo: state.employeeDetailReducer.data,
    imageInfo: state.getImageReducer.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployeeInfo: (id) => {
      dispatch(actEmployeeDetailAPI(id));
    },
    fetchImage: (id) => {
      dispatch(actGetImageAPI(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
