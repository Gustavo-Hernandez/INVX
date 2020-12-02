import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ImageIcon from "@material-ui/icons/Image";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Grid, Button, Typography } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  header: {
    backgroundColor: theme.palette.info.main,
    color: "white",
    fontWeight: "bold",
    padding: theme.spacing(2, 4, 2),
  },
  form: {
    marginTop: 12,
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    marginBottom: 12,
  },
  img: {
    border: "2px solid lightgrey",
    borderRadius: 5,
    width: 150,
    height: 180,
    objectFit: "contain",
  },
}));

const ProductsForm = ({
  folders,
  onSubmit,
  loading,
  submitText,
  headerText,
  errors,
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [folder, setFolder] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(undefined);

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
  };

  const folderOptions = folders.map((f, index) => (
    <MenuItem key={index} value={f.id}>
      {f.id}
    </MenuItem>
  ));

  return (
    <Fade in>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5" component="h5">
            {headerText}
          </Typography>
        </div>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10} className={classes.margin}>
              <FormControl fullWidth size="medium" variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-item">
                  Item Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-item"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  autoComplete="off"
                  startAdornment={
                    <InputAdornment position="start">Aa</InputAdornment>
                  }
                  labelWidth={90}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} className={classes.margin}>
              <FormControl size="medium" fullWidth variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-price">
                  Price
                </InputLabel>
                <OutlinedInput
                  onChange={(e) => setUnitPrice(e.currentTarget.value)}
                  value={unitPrice}
                  id="outlined-adornment-price"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={50}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className={classes.margin}>
              <FormControl size="medium" fullWidth variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-units">
                  Units
                </InputLabel>
                <OutlinedInput
                  onChange={(e) => setUnits(e.currentTarget.value)}
                  value={units}
                  id="outlined-adornment-units"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">#</InputAdornment>
                  }
                  labelWidth={50}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3} className={classes.margin}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="folder">Folder</InputLabel>
                <Select
                  labelId="folder"
                  id="select-helper"
                  labelWidth={60}
                  onChange={(e) => setFolder(e.target.value)}
                  value={folder}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {folderOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8} className={classes.margin}>
              <FormControl fullWidth size="medium" variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-description">
                  Description
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-description"
                  multiline
                  rowsMax={3}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  value={description}
                  autoComplete="off"
                  startAdornment={
                    <InputAdornment position="start">Aa</InputAdornment>
                  }
                  labelWidth={95}
                />
              </FormControl>
            </Grid>
            {typeof image !== "undefined" && (
              <Grid item xs={12}>
                <img alt="img-form" className={classes.img} src={image} />
              </Grid>
            )}
            <Grid item xs={12}>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={(e) =>
                    handleFileSelection(e.currentTarget.files[0])
                  }
                  accept="image/x-png,image/jpg,image/jpeg"
                />
                <Button
                  color="secondary"
                  variant="contained"
                  component="span"
                  startIcon={<ImageIcon />}
                >
                  Select Image
                </Button>
              </label>
              <Button
                style={{
                  marginLeft: 15,
                  backgroundColor: "green",
                  color: "white",
                }}
                variant="contained"
                component="span"
                disabled={loading}
                startIcon={<AddBoxIcon />}
                onClick={() =>
                  onSubmit({
                    name,
                    units,
                    unitPrice,
                    folder,
                    description,
                    file,
                  })
                }
              >
                {loading ? "Loading" : submitText}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {errors}
            </Grid>
          </Grid>
        </div>
      </div>
    </Fade>
  );
};
export default ProductsForm;
