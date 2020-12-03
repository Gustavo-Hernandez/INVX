import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
  Button,
  Fade,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useParams } from "react-router-dom";
import { Context as ItemsContext } from "../../context/ItemsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(3),
    borderTop: "12px solid lightblue",
  },
  fab: {
    position: "relative",
    float: "right",
  },
  row: {
    display: "flex",
    marginBottom: 8,
  },
  dataContainer: {
    marginBottom: 25,
  },
  imageContainer: {
    height: "250px",
  },
  image: {
    height: "100%",
    borderRadius: 5,
    border: "1px solid lightgray",
  },
}));

const Product = ({ history }) => {
  const { id } = useParams();
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState({
    name: "Product",
    units: 0,
    unitPrice: 0,
    description: "",
    url: "",
  });
  const {
    state: { items },
  } = useContext(ItemsContext);

  useEffect(() => {
    const foundProduct = items.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      history.push("/products");
    }
  }, [product, id, items]);

  return (
    <Fade in>
      <Paper className={classes.root}>
        <Fab color="secondary" aria-label="edit" className={classes.fab}>
          <EditIcon />
        </Fab>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={4} className={classes.dataContainer}>
            <Grid item xs={12} className={classes.row}>
              <Typography variant="h5" component="h5">
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <Chip color="primary" label={`Folder: ${product.folder}`} />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <Typography variant="button" component="div">
                Units: {product.units}
              </Typography>
              <Typography
                variant="button"
                component="div"
                style={{ marginLeft: 20 }}
              >
                Price: ${product.unitPrice}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="button" component="p">
                Description:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ marginLeft: 20 }}
              >
                {product.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} className={classes.imageContainer}>
            <img alt="product" className={classes.image} src={product.url} />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
      </Paper>
    </Fade>
  );
};
export default Product;
