import React from "react";
import QRCode from "react-qr-code";
import { Grid, Typography, Button, makeStyles, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    marginBottom: 8,
  },
  labelContainer: {
    minHeight: 200,
    marginTop: 10,
    marginBottom: 15,
    border: "1px solid lightgray",
    borderRadius: 8,
    padding: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  saveButton: {
    position: "relative",
    float: "right",
  },
}));

const Label = ({ id, name, folder, description }) => {
  const classes = useStyles();
  return (
    <Fade in>
        <Grid
      container
      className={classes.row}
      justify="center"
      style={{ borderTop: "1px solid lightgray", marginBottom: 20 }}
    >
      <Grid item xs={10} className={classes.labelContainer}>
        <Grid item xs={12} md={5} style={{ marginBottom: 15 }}>
          <Grid item xs={12} className={classes.row}>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography variant="button" component="p">
              {`Folder: ${folder}`}
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
              {description}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <QRCode size={180} value={id} />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Button
          variant="contained"
          color="primary"
          className={classes.saveButton}
        >
          Save Label
        </Button>
      </Grid>
    </Grid>
    </Fade>
  );
};
export default Label;
