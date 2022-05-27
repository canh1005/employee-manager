import { makeStyles } from "@mui/styles";

export const dashBoardStyled = makeStyles({
  root: {
    borderRadius: "5px 0 0 5px",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: "10px 20px",
    "& span": {
      marginLeft: 20,
    },
    "&.active": {
      background: "red",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "5px",
        background: "green",
      },
    },
  },
  menu: {
    display: "flex",
    flexDirection: "column",
  },
});
export const appGlass = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "11rem auto",
    background: "rgba(255,255,255,0.2)",
    width: "97%",
    height: "97%",
    overflow: "hidden",
    borderRadius: 5,
  },
});

export const employeeModal = makeStyles({
  root: {
    maxWidth: "600px",
  },
  box: {
    background: "#fff",
    width: "100%",
  },
  title: {
    background: "blue",
    color: "white",
    padding: "10px 20px",
    marginBottom: "20px!important",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root:first-child": {
      width: "100%",
    },
    "& .MuiTextField-root:not(:first-child)": {
      width: "50%",
    },
    "& .MuiTextField-root": {
      marginBottom: "20px",
      '& .MuiInputLabel-root.Mui-focused,.MuiInputLabel-root.MuiFormLabel-filled':{
        transform: 'translate(24px, -9px) scale(.75)'
      },
      "& .MuiInputBase-root": {
        margin: "0 10px",
      },
    },
  },
  btn: {
    marginBottom: "20px",
    textAlign: "right",
    width: "100%",
    "& button": {
      margin: "0 5px",
    },
  },
});
