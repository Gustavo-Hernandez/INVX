import React, { useContext, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Fade from "@material-ui/core/Fade";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ProductCard from "./ProductCard";
import ProductsForm from "./ProductsForm";
import Chip from "@material-ui/core/Chip";
import { Context as ItemsContext } from "../../context/ItemsContext";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  options: {
    marginBottom: "15px",
  },
  products: {
    width: "100%",
    display: "inline-block",
  },
  errors: {
    backgroundColor: "#C23B22",
    color: "white",
    marginLeft: 4,
    marginBottom: 4,
  },
  filters: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const Products = () => {
  const classes = useStyles();
  const { state, createItem, clearError, deleteItem } = useContext(
    ItemsContext
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");
  const [keyForm, setKey] = useState(1);

  const handleSubmission = async ({
    name,
    units,
    unitPrice,
    folder,
    description,
    file,
  }) => {
    setLoading(true);
    const response = await createItem({
      name,
      units,
      unitPrice,
      folder,
      description,
      file,
    });
    if (response) {
      setKey(keyForm + 1);
      store.addNotification({
        title: "Success!",
        message: "Product was created.",
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
      setShowForm(false);
    }
    setLoading(false);
  };

  const toggleAddItemForm = () => {
    if (!showForm && state.error.length > 0) {
      clearError();
    }
    setShowForm((prev) => !prev);
  };

  const handleFilterButton = (e) => {
    if (e.target.value === "") {
      setFiltering(false)
    }else{
      setFiltering(true)
      let filtered =  state.items.filter(item => item.folder === e.target.value);
      let filteredComponent = filtered.map((product, index) => (
        <ProductCard key={index} handleDelete={deleteItem} {...product} />
      ));
      setFilteredProducts(filteredComponent);
    }
    setFolderFilter(e.target.value);
  };

  const folderOptions = state.folders.map((folder, index) => (
    <MenuItem onClick={handleFilterButton} key={index} value={folder.id}>
      {folder.id}
    </MenuItem>
  ));

  const products = state.items.map((product, index) => (
    <ProductCard key={index} handleDelete={deleteItem} {...product} />
  ));

  const renderErrors = state.error.split("\n").map((e, index) => {
    if (e.trim().length > 0) {
      return <Chip key={index} className={classes.errors} label={e} />;
    }
    return null;
  });

  return (
    <Fade in>
      <div className={classes.root}>
        <Grid container className={classes.options}>
          <Grid item style={{ width: "100%" }}>
            <div className={classes.filters}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddCircleIcon />}
                onClick={toggleAddItemForm}
              >
                {showForm ? "Close" : "Add Product"}
              </Button>
              <FormControl variant="outlined">
                <InputLabel id="folder-filter">Filter by Folder</InputLabel>
                <Select
                  labelId="folder-filter"
                  id="select-helper-filter"
                  labelWidth={160}
                  onChange={handleFilterButton}
                  value={folderFilter}
                  style={{width:"160px"}}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {folderOptions}
                </Select>
              </FormControl>
              
            </div>
          </Grid>
        </Grid>
        {showForm && (
          <ProductsForm
            loading={loading}
            submitText="Create Item"
            headerText="New Item Content"
            folders={state.folders}
            errors={renderErrors}
            onSubmit={handleSubmission}
          />
        )}
        <Divider />
        <div className={classes.products}>{filtering ? filteredProducts : products}</div>
      </div>
    </Fade>
  );
};
export default Products;
