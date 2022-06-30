import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff919d",
      dark: "rgb(208 118 127)",
    },
    secondary: {
      main: "#c484f3",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});
export const loaddingStyled = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "auto",
    width: "180px",
    height: "180px",
    "& span:first-child": {
      position: "absolute",
      left: "10px",
      right: "10px",
      top: "10px",
      bottom: "10px",
      background: `rgba(233,30,99, .05)`,
      borderRadius: " 50%",
      backdropFilter: "blur(10px)",
      zIndex: 2,
    },
    "& span:last-child": {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      display: "block",
      borderRadius: " 50%",
      zIndex: 1,
      overflow: "hidden",
      animation: `$rotateCircle 1s linear infinite`,
    },
    "& span:last-child::before": {
      content: '""',
      position: "absolute",
      left: "-50%",
      top: "-50%",
      width: "100%",
      height: "100%",
      background: theme.palette.primary.main,
    },
  },
  "@keyframes rotateCircle": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));
export const dashBoardStyled = makeStyles((theme) => ({
  root: {
    borderRadius: "5px 0 0 5px",
  },
  title: {
    fontSize: "18px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    margin: "40px 20px 0",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    position: "relative",
    margin: "10px 0",
    "& span": {
      marginLeft: 20,
    },
    "&.active": {
      background: theme.palette.primary.main,
      borderRadius: "0 10px 10px 0",
      "&::before": {
        content: '""',
        height: "100%",
        width: "5px",
        background: theme.palette.primary.dark,
        top: 0,
        left: 0,
        position: "absolute",
      },
    },
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
  },
}));
export const appGlass = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "11rem auto",
    background: "rgba(255,255,255,0.54)",
    width: "97%",
    height: "97%",
    overflow: "hidden",
    borderRadius: 5,
    gridGap: "10px",
  },
});

export const modalStyled = makeStyles({
  root: {},
  box: {
    background: "rgba(255,255,255,.3)",
    maxWidth: "600px",
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,.3)",
    borderRadius: "10px",
    boxShadow: "rgba(255, 255, 255, 0.4) 1.95px 1.95px 2.6px",
  },
  title: {
    background: "transparent",
    color: "white",
    padding: "10px 20px",
    marginBottom: "20px!important",
    textAlign: "center",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    "& .MuiTextField-root": {
      marginBottom: "20px",
      "& .MuiInputLabel-root.Mui-focused,.MuiInputLabel-root.MuiFormLabel-filled": {
        transform: "translate(24px, -9px) scale(.75)",
      },
      "& .MuiInputBase-root": {
        margin: "0 10px",
      },
    },
    "& .MuiFormHelperText-root.Mui-error, .MuiInputLabel-root.Mui-error": {
      color: "#ff2424",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
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
    background: "rgba(255,255,255,.6)!important",
  },
  cardContent: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "90px!important",
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
    "& button": {
      margin: "5px 5px 0 0",
    },
  },
  imgBox: {
    position: "relative",
    marginTop: "60px",
  },
  imgOverlay: {
    position: "absolute",
    color: "#fff",
    opacity: 0,
    transition: "all .3s",
    background: "rgba(0,0,0,.4)!important",
  },
  imgButton: {
    position: "absolute!important",
    top: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
    "&:hover": {
      "& .makeStyles-imgOverlay-10": {
        opacity: 1,
      },
    },
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
  employeeTabsBox: {},
});

export const searchStyled = makeStyles({
  search: {
    position: "relative",
    borderRadius: "10px",
    backgroundColor: "white",
    marginLeft: 0,
    width: "300px",
    margin: "20px 0",
  },
  searchIconWrapper: {
    padding: "0 20px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBase: {
    padding: "0 25px",
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "10px 20px",
      // vertical padding + font size from searchIcon
      width: "100%",
    },
  },
});

export const listEmpStyled = makeStyles((theme) => ({
  root: {
    margin: "0 20px",
  },
  toolBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    "& button": {
      borderRadius: "50%",
      width: "50px",
      height: "55px",
      padding: 0,
      color: "#fff",
    },
    "& button:not(:last-child)": {
      margin: "0 10px",
    },
  },
}));

export const dataTableStyled = makeStyles((theme) => ({
  root: {
    background: "rgba(255, 255, 255, .6)!important",
  },
  tableHead: {
    "& th": {
      fontSize: "18px",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  },
}));

export const informationStyled = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    justifyItems: "center",
    "& p": {
      width: "50%",
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      padding: "20px",
      color: "#fff",
    },
    "& p:first-child": {
      background: theme.palette.primary.main,
      boxShadow: `${theme.palette.primary.main} 0px 10px 20px 0px`,
    },
    "& p:nth-child(2)": {
      background: theme.palette.secondary.main,
      boxShadow: `${theme.palette.secondary.main} 0px 10px 20px 0px`,
    },
    "& p:nth-child(3)": {
      background: theme.palette.primary.dark,
      boxShadow: `${theme.palette.primary.dark} 0px 10px 20px 0px`,
    },
    "& p:last-child": {
      background: theme.palette.error.light,
      boxShadow: `${theme.palette.error.light} 0px 10px 20px 0px`,
    },
    "& svg": {
      marginRight: "10px",
      fontSize: "2rem",
    },
    "& span": {
      display: "block",
      marginBottom: "5px",
    },
    "& span:first-child": {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
}));

export const teamPageStyled = makeStyles((theme) => ({
  root: {
    // "& div:first-child": {
    //   width: "40%",
    //   marginRight: "10px",
    //   "& table": {
    //     minWidth: "0px",
    //   },
    // },
    
    "& form": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  header : {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridGap: "10px",
  },
  bodyContent:{
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridGap: "10px",
  },
  title: {
    margin: "20px 0!important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
