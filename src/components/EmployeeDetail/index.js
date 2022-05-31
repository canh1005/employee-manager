import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { employeeDetail } from "../../material-ui";
import { actEmployeeDetailAPI } from "../../redux/modules/EmployeeDetailReducer/action";
import { actGetImageAPI } from "../../redux/modules/GetImageReducer/action";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ResponsiveDialog from "../Dialog";

function EmployeeDetail(props) {
  const { employeeInfo, imageInfo } = props;
  const employeeId = useParams().id;
  const classes = employeeDetail();
  const navigate = useNavigate();
  
  const [openDialog, setOpenDialog] = React.useState(false);
  useEffect(() => {
    props.fetchEmployeeInfo(employeeId);
    props.fetchImage(employeeId);
    navigate("info", { replace: true });
  }, []);
  const handleDeleteClick = () => {
    setOpenDialog(true);
    console.log(openDialog); 
  };
  const renderEmployeeInfo = () => {
    if (employeeInfo) {
      return (
        <>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">{employeeInfo.fullName}</Typography>
            <Box>
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
            </Box>
          </CardContent>
        </>
      );
    }
  };
  return (
    <Box>
      <Card className={classes.card}>
        <Box className={classes.imgBox}>
          <Avatar
            className={classes.img}
            alt={employeeInfo ? `${employeeInfo.fullName} avatar` : ""}
            src={
              imageInfo && imageInfo.status !== 400
                ? imageInfo.config.baseURL + imageInfo.config.url
                : ""
            }
          />
        </Box>
        <Box className={classes.employeeInfoBtn}>
          <Button variant="contained">
            <ModeEditIcon />
          </Button>
          <Button variant="contained" onClick={handleDeleteClick}>
            <DeleteIcon  />
          </Button>
        </Box>
        {renderEmployeeInfo()}
      </Card>
      <Box>
        <Box className={classes.employeeTabs}>
          <Link to="info">Information</Link>
          <Link to="working">Working</Link>
          <Link to="advances">Advances</Link>
          <Link to="statistics">Statistics</Link>
        </Box>
        <Box className={classes.employeeTabsBox}>
          <Outlet />
        </Box>
      </Box>
      <ResponsiveDialog open={openDialog} setOpen={setOpenDialog}/>
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
