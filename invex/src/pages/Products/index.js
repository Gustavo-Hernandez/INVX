import React, { useContext } from "react";
import { Button, Divider, Grid, makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {Context as ItemsContext} from "../../context/ItemsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  options:{
    marginBottom: "15px"
  },
  products:{
    width:"100%"
  }
}));

const Products = () => {
  const classes = useStyles();
  const {state} = useContext(ItemsContext)
  return (
    <Fade in>
      <div className={classes.root}>
        <Grid container className={classes.options}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleIcon />}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
        <Divider/>
        <div className={classes.products}>
          {console.log(state.items)}
        </div>
      </div>
    </Fade>
  );
};
export default Products;
