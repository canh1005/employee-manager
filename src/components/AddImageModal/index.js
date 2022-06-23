import { Box, Button, Modal, Typography } from '@mui/material'
import { modalStyled } from 'material-ui';
import React, { useState } from 'react'

function AddImageModal(props) {
  const { open, setOpen } = props;
  const classes = modalStyled();
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
    <Modal open={open.isOpen} onClose={() => setOpen({ isOpen: false })} className={classes.root}>
      <Box className={classes.box}>
        <Typography className={classes.title} variant="h4">
          Add your image
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
          <img src={image.profileImg} alt='' width="200px" height="200px" />
          <input type="file" name="image-upload" accept='image/*' onChange={handleImageChange} />
        </Box>
        <Box className={classes.buttonBox}>
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