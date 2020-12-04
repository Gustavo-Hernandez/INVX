import React, { useContext, useState } from "react";
import { makeStyles, Grid, Button, Typography, Chip } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { store } from "react-notifications-component";
import { Context as ItemsContext } from "../../context/ItemsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  option: {
    width: "100%",
    border: "1px solid lightgray",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  header: {
    padding: theme.spacing(2),
    color: "white",
    backgroundColor: theme.palette.secondary.main,
  },
  margin: {
    padding: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  errors: {
    backgroundColor: "#C23B22",
    color: "white",
    marginLeft: 4,
    marginBottom: 4,
  },
}));

const Folders = () => {
  const classes = useStyles();
  const { state, createFolder } = useContext(ItemsContext);
  const [newFolderName, setNewFolderName] = useState("");
  const [localErrors, setLocalErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyForm, setKey] = useState(1);

  const renderErrors = localErrors.split("\n").map((e, index) => {
    if (e.trim().length > 0) {
      return <Chip key={index} className={classes.errors} label={e} />;
    }
    return null;
  });

  const validateFolder = () => {
    if (newFolderName.length > 0) {
      let res = state.folders.filter((folder) => folder.id === newFolderName);
      if (res.length > 0) {
        setLocalErrors("Folder Already exists");
        return false;
      }
      return true;
    } else {
      setLocalErrors("Missing values.");
      return false;
    }
  };

  const handleAddFolder = async () => {
    setLoading(true);
    setLocalErrors("");
    let isValid = validateFolder();
    if (isValid) {
      await createFolder(newFolderName);
      setNewFolderName("");
      setKey(keyForm + 1);
      store.addNotification({
        title: "Success!",
        message: "Folder was created.",
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
    }
    setLoading(false);
  };

  return (
    <Fade in>
      <div className={classes.root}>
        <Grid container justify="space-around">
          <Grid item xs={12} md={5} className={classes.option}>
            <Grid className={classes.header} item xs={12}>
              <Typography variant="h5" component="h5">
                Create Folder
              </Typography>
            </Grid>
            <Grid className={classes.margin} item xs={12}>
              <FormControl fullWidth size="medium" variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-item">
                  Folder Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-item"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.currentTarget.value)}
                  autoComplete="off"
                  startAdornment={
                    <InputAdornment position="start">Aa</InputAdornment>
                  }
                  labelWidth={120}
                />
              </FormControl>
            </Grid>
            <Grid className={classes.margin} item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddFolder}
              >
                {loading ? "Loading" : "Add Folder"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {renderErrors}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};
export default Folders;
