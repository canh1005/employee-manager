import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actEmployeeDetailAPI, actEmployeeEdited } from 'redux/modules/EmployeeDetailReducer/action';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Input,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { employeeDetail } from 'material-ui';
import { actGetImageAPI } from 'redux/modules/GetImageReducer/action';
import EmployeeModal from 'components/EmployeeModal';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ResponsiveDialog from "../../Commons/Dialog";
import AddImageModal from 'components/AddImageModal';


function EmployeeInfoDetail() {
    const employeeInfo = useSelector(state => state.employeeDetailReducer.data);
    const imageInfo = useSelector(state => state.getImageReducer.data);
    const dispatch = useDispatch();
    const employeeId = useParams().id;
    const navigate = useNavigate();
    const classes = employeeDetail();
    const [confirmDialog, setConfirmDialog] = React.useState({
        isOpen: false,
        title: ""
    });
    const [openEditModel, setOpenEditModel] = useState({
        isOpen: false,
    });
    const [openAddImgModal, setOpenAddImgModal] = useState({
        isOpen: false,
    });
    console.log(openAddImgModal);
    useEffect(() => {
        dispatch(actEmployeeDetailAPI(employeeId))
        dispatch(actGetImageAPI(employeeId))
        navigate('info', { replace: true })
        return () => {
            dispatch(actEmployeeEdited(""))
        }
    }, [])
    const renderEmployeeInfo = () => {
        if (employeeInfo) {
            return (
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
            );
        }
    };
    const handleEditModel = () => {
        setOpenEditModel({
            isOpen: true,
        })
        dispatch(actEmployeeEdited(employeeInfo))
    }
    const handleDeleteConfirm = () => {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure to delete this employee?",
        })
    }
    return (
        <>
            <Card className={classes.card}>
                <Box className={classes.imgBox}>
                    <Button className={classes.imgButton} component='label' onClick={() => setOpenAddImgModal({ isOpen: true })}>
                        <Avatar
                            className={classes.img}
                            alt={employeeInfo ? `${employeeInfo.fullName} avatar` : ""}
                            src={
                                imageInfo && imageInfo.status !== 400
                                    ? imageInfo.config.baseURL + imageInfo.config.url
                                    : ""
                            }
                        />
                    </Button>
                </Box>
                <Box className={classes.employeeInfoBtn}>
                    <Button variant="contained" onClick={handleEditModel} color="primary">
                        <ModeEditIcon />
                    </Button>
                    <Button variant="contained" onClick={handleDeleteConfirm} color="error">
                        <DeleteIcon />
                    </Button>
                </Box>
                {renderEmployeeInfo()}
            </Card>
            <EmployeeModal open={openEditModel} setOpenModal={setOpenEditModel} />
            <ResponsiveDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <AddImageModal open={openAddImgModal} setOpen={setOpenAddImgModal} />
        </>

    )
}

export default EmployeeInfoDetail