import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import ProductCard from "../Products/ProductCard";
import { Context as ItemsContext } from "../../context/ItemsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  products: {
    width: "100%",
    display: "inline-block",
  },
}));

const Products = () => {
  const classes = useStyles();
  const { state, deleteItem, updateUnits } = useContext(ItemsContext);

  const products = state.items
    .filter(
      (product) => parseFloat(product.units) < parseFloat(product.minStock)
    )
    .map((product, index) => (
      <ProductCard
        key={index}
        handleUpdateUnits={updateUnits}
        handleDelete={deleteItem}
        {...product}
      />
    ));

  return (
    <Fade in>
      <div className={classes.root}>
        <h2>Low Stock Products:</h2>
        <div className={classes.products}>
          {products.length > 0 ? products : <h5>No Low Stock products </h5>}
        </div>
      </div>
    </Fade>
  );
};
export default Products;
