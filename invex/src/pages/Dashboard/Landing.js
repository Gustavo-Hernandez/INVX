import React, { useContext } from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import { Context as ItemsContext } from "../../context/ItemsContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import WarningIcon from "@material-ui/icons/Warning";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  link: {
    textDecoration: "None",
  },
  action: {
    width: 250,
    height: 120,
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: 12,
    margin: 12,
    "&:hover": {
      boxShadow: "0px 0px 9px 0px rgba(50, 50, 50, 0.75)",
    },
  },
  icon: {
    position: "relative",
    color: "white",
    opacity: 0.2,
    top: 0,
    marginLeft: 150,
    fontSize: 150,
    zIndex: 2,
  },
}));

const Landing = () => {
  const classes = useStyles();
  const { state } = useContext(ItemsContext);

  const currentLowstock = state.items.filter(
    (product) => parseFloat(product.units) < parseFloat(product.minStock)
  ).length;

  return (
    <Fade in>
      <div className={classes.root}>
        <Link className={classes.link} to="/products">
          <div
            className={classes.action}
            style={{
              backgroundImage:
                "linear-gradient(to right top, #11479b, #0f5ab0, #0d6ec4, #0d82d8, #1296eb)",
            }}
          >
            <h2 style={{ position: "absolute" }}>Create Products</h2>
            <AddCircleOutlineIcon className={classes.icon} />
          </div>
        </Link>
        <Link className={classes.link} to="/logs">
          <div
            className={classes.action}
            style={{
              backgroundImage:
                "linear-gradient(to right top, #0655ac, #006bba, #0080c5, #2294cd, #44a8d5)",
            }}
          >
            <h2 style={{ position: "absolute" }}>See Logs</h2>
            <ListIcon className={classes.icon} />
          </div>
        </Link>
        <Link className={classes.link} to="/lowstock">
          <div
            className={classes.action}
            style={{
              backgroundImage:
                "linear-gradient(to right top, #c8681e, #d0791d, #d68b1e, #db9d21, #deaf28)",
            }}
          >
            <h2 style={{ position: "absolute", width: 180 }}>
              Current Low Stock Products: {currentLowstock}
            </h2>
            <WarningIcon className={classes.icon} />
          </div>
        </Link>
      </div>
    </Fade>
  );
};
export default Landing;
