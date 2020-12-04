import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
  Button,
  Fade,
  makeStyles
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ProductsForm from "../Products/ProductsForm";
import { useParams } from "react-router-dom";
import { Context as ItemsContext } from "../../context/ItemsContext";
import { store } from "react-notifications-component";
import Label from "./Label";

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
  }
}));

const Product = ({ history }) => {
  const { id } = useParams();
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [keyForm, setKey] = useState(1);
  const [product, setProduct] = useState({
    name: "Product",
    units: 0,
    unitPrice: 0,
    description: "",
    url: "",
  });

  const {
    state: { items, folders, error },
    updateItem,
  } = useContext(ItemsContext);

  useEffect(() => {
    const foundProduct = items.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      history.push("/products");
    }
  }, [product, id, items, history]);

  const handleSubmission = async ({
    name,
    units,
    unitPrice,
    folder,
    description,
    file,
    editedFile,
  }) => {
    setLoading(true);
    const response = await updateItem({
      id,
      name,
      units,
      unitPrice,
      folder,
      description,
      file,
      editedFile,
    });
    if (response) {
      setKey(keyForm + 1);
      store.addNotification({
        title: "Success!",
        message: "Product was updated.",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });

      setIsEditing(false);
    }
    setLoading(false);
  };

  const renderErrors = error.split("\n").map((e, index) => {
    if (e.trim().length > 0) {
      return <Chip key={index} className={classes.errors} label={e} />;
    }
    return null;
  });

  return (
    <Fade in>
      <Paper className={classes.root}>
        <Fab
          color="secondary"
          aria-label="edit"
          className={classes.fab}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <EditIcon />
        </Fab>
        {isEditing ? (
          <ProductsForm
            product={product}
            loading={loading}
            submitText="Update Item"
            headerText="Update Item"
            folders={folders}
            errors={renderErrors}
            onSubmit={handleSubmission}
          />
        ) : (
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
            {showLabel && <Label {...product}/>}
          </Grid>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 20 }}
          onClick={() => setShowLabel((prev)=> !prev)}
        >
         {showLabel ? "Hide Label" : "Show Label"}
        </Button>
      </Paper>
    </Fade>
  );
};
export default Product;
