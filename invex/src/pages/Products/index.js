import React, { useContext, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  InputBase,
  makeStyles,
  Paper,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Fade from "@material-ui/core/Fade";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ProductCard from "./ProductCard";
import ProductsForm from "./ProductsForm";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@material-ui/core/Chip";
import { Context as ItemsContext } from "../../context/ItemsContext";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  options: {
    marginBottom: "7px",
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchbar: {
    height: "100%",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    border: "1px solid lightgray",
  },
  filter: {
    marginBottom: 8,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const Products = () => {
  const classes = useStyles();
  const { state, createItem, clearError, deleteItem, updateUnits } = useContext(
    ItemsContext
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
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

  const handleSearch = (e) => {
    let filtered = [];
    if(e.target.value === "" && folderFilter === ""){
      setFiltering(false);
    }else if(e.target.value === "" && folderFilter !== ""){
      filtered = state.items.filter(
        (item) => item.folder === folderFilter
      );
    } else{
      if (folderFilter !== "") {
        filtered = state.items.filter(
          (item) =>
            item.folder === folderFilter && item.name.includes(e.target.value)
        );
      } else {
        filtered = state.items.filter((item) =>
          item.name.includes(e.target.value)
        );
        setFiltering(true);
      }
    }
    let filteredComponent = filtered.map((product, index) => (
      <ProductCard key={index} handleUpdateUnits={updateUnits} handleDelete={deleteItem} {...product} />
    ));
    setFilteredProducts(filteredComponent);
    setSearchFilter(e.target.value);
  };

  const handleFilterButton = (e) => {
    let filtered=[];
    if (e.target.value === "" &&  searchFilter === "") {
      setFiltering(false);
    }else if(e.target.value === "" && searchFilter !== ""){
      filtered = state.items.filter(
        (item) =>
          item.name.includes(e.target.value)
      );
    } 
    else {
      if (searchFilter !== "") {
        filtered = state.items.filter(
          (item) =>
            item.folder === e.target.value && item.name.includes(searchFilter)
        );
      }else{
        filtered = state.items.filter(
          (item) => item.folder === e.target.value
        );
        setFiltering(true);
      }  
    }
    let filteredComponent = filtered.map((product, index) => (
      <ProductCard key={index} handleUpdateUnits={updateUnits} handleDelete={deleteItem} {...product} />
    ));
    setFilteredProducts(filteredComponent);
    setFolderFilter(e.target.value);
  };

  const folderOptions = state.folders.map((folder, index) => (
    <MenuItem onClick={handleFilterButton} key={index} value={folder.id}>
      {folder.id}
    </MenuItem>
  ));

  const products = state.items.map((product, index) => (
    <ProductCard key={index} handleUpdateUnits={updateUnits} handleDelete={deleteItem} {...product} />
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
          <Grid className={classes.filters}>
            <Grid item xs={12} md={3} className={classes.filter}>
              <Paper component="form" className={classes.searchbar}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Item"
                  autoCorrect="none"
                  onChange={handleSearch}
                  value={searchFilter}
                />
                <SearchIcon />
              </Paper>
            </Grid>
            <Grid item xs={5} md={2} className={classes.filter}>
              <Button
                fullWidth
                style={{ height: "100%" }}
                variant="contained"
                color="secondary"
                startIcon={<AddCircleIcon />}
                onClick={toggleAddItemForm}
              >
                {showForm ? "Close" : "Add Product"}
              </Button>
            </Grid>
            <Grid item xs={5} md={3} className={classes.filter}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="folder-filter">Filter by Folder</InputLabel>
                <Select
                  labelId="folder-filter"
                  id="select-helper-filter"
                  labelWidth={160}
                  onChange={handleFilterButton}
                  value={folderFilter}
                  style={{ width: "160px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {folderOptions}
                </Select>
              </FormControl>
            </Grid>
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
        <div className={classes.products}>
          {filtering ? filteredProducts : products}
        </div>
      </div>
    </Fade>
  );
};
export default Products;
