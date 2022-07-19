import { Box, Button, Modal, Typography } from "@mui/material";
import { modalStyled } from "material-ui";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actAddImageAPI } from "redux/modules/ImageReducer/action";

function AddImageModal(props) {
  const { open, setOpen } = props;
  const employeeInfo = useSelector((state) => state.employeeDetailReducer.data);
  const employeeID = useParams().id;
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const classes = modalStyled();
  const [image, setImage] = useState({
    profileImg:
      "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png",
    imgFile: "",
  });

  useEffect(() => {
    if(employeeInfo && employeeInfo.imgName !== null){
      setImage({
        ...image,
        profileImg: employeeInfo.imgName,
      })
    }
    return(()=>{
      setImage({
        ...image,
        imgFile: "",
      })
    })
  }, [employeeInfo && employeeInfo.imgName]);
  
  
  const handleImgClick = () => {
    imgRef.current.click();
  };
  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage({
          ...image,
          profileImg: reader.result,
          imgFile: event.target.files[0],
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log("img", event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const frmData = new FormData();
    frmData.append("file", image.imgFile);
    frmData.append("employeeId", employeeID);
    console.log("frmData", frmData.get("file"));
    setOpen({ isOpen: false });
    dispatch(actAddImageAPI(frmData, employeeID));
  };
  return (
    <Modal
      open={open.isOpen}
      onClose={() => setOpen({ isOpen: false })}
      className={classes.root}
    >
      <Box className={classes.box}>
        <Typography className={classes.title} variant="h4">
          Add your image
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={image.profileImg}
            alt=""
            width="200px"
            height="200px"
            onClick={handleImgClick}
          />
          <input
            type="file"
            name="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: "170px" }}
            ref={imgRef}
          />
        </Box>
        <Box className={classes.buttonBox}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen({ isOpen: false })}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={image.imgFile !== "" ? false : true}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddImageModal;
