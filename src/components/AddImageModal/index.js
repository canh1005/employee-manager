import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  ".MuiTextField-root": {
    width: "50%",
    margin: "0 10px",
  },
  ".btn-box": {
    margin: "10px",
    button: {
      marginRight: "10px",
    },
  },
};
function AddImageModal(props) {
  const { open, setOpen } = props;
  const [image, setImage] = useState({
    profileImg: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
  })
  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage({ profileImg: reader.result })
      }
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  return (
    <Modal open={open.isOpen} onClose={() => setOpen({ isOpen: false })}>
      <Box className={style}>
        <Typography variant="h6" component="h2">
          Add your image
        </Typography>
        <img src={image.profileImg} alt='' width="200px" height="200px" />
        <input type="file" name="image-upload" accept='image/*' onChange={handleImageChange} />
        <Box className="btn-box">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen({ isOpen: false })}
          >
            Cancle
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal >
  )
}

export default AddImageModal