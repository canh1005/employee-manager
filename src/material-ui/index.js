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
  root: {},
  box: {
    background: "#fff",
    maxWidth: "600px",
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  title: {
    background: "blue",
    color: "white",
    padding: "10px 20px",
    marginBottom: "20px!important",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",

    "& .MuiTextField-root:not(:first-child)": {
      width: "50%",
    },
    "& .MuiTextField-root:first-child": {
      width: "100%",
    },
    "& .MuiTextField-root": {
      marginBottom: "20px",
      "& .MuiInputLabel-root.Mui-focused,.MuiInputLabel-root.MuiFormLabel-filled": {
        transform: "translate(24px, -9px) scale(.75)",
      },
      "& .MuiInputBase-root": {
        margin: "0 10px",
      },
    },
  },
  buttonBox: {
    marginBottom: "20px",
    textAlign: "right",
    width: "100%",
    "& button": {
      margin: "0 5px",
    },
  },
});

export const employeeDetail = makeStyles({
  card: {
    margin: "20px 0",
    overflow: "unset!important",
    position: "relative",
  },
  cardContent: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: '90px!important',
    "& div": {
      display: "flex",
    },
    "& h5": {
      marginBottom: "10px",
    },
    "& p": {
      margin: "0 20px",
      display: "flex",
      "& span:first-child": {
        marginRight: "5px",
      },
    },
  },
  employeeInfoBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    '& button':{
      margin: '5px 5px 0 0'
    }
  },
  imgBox: {
    position: "relative",
    marginTop: "60px",
  },
  imgButton:{
    position: 'absolute!important',
    top: "-50px",
    left: '50%',
    transform: 'translateX(-50%)'
  },
  img: {
    border: "5px solid #fff",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
    width: "110px!important",
    height: "110px!important",
    margin: "0 auto",
    overflow: "hidden",
    // position: "absolute!important",
    // top: "-50px",
    // left: '50%',
    // transform: 'translateX(-50%)'
  },
  employeeTabs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      padding: "10px 20px",
    },
  },
  employeeTabsBox: {
    background: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
  },
});

export const employeeTabs = makeStyles({
  box: {
    background: "#fff",
  },
});
