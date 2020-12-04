import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Grid, Button, makeStyles, Fade } from "@material-ui/core";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    marginBottom: 8,
    backgroundColor: "white",
  },
  labelContainer: {
    minHeight: 200,
    border: "1px solid lightgray",
    borderRadius: 8,
    padding: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  saveButton: {
    position: "relative",
    float: "right",
  },
}));

const Label = ({ id, name, folder, description }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleLabelSave = async () => {
    setLoading(true);

    let domElement = document.getElementById("label-product");
    try {
      let html_jpeg = await htmlToImage.toJpeg(domElement);
      let pdf = new jsPDF("p", "mm",[70,90]);
      pdf.addImage(html_jpeg, "JPEG", 0, 0, 70, 90);
      pdf.save(`${name}_label.pdf`);
    } catch (error) {
      console.log("[SAVE PDF] :" + error);
    }
    setLoading(false);
  };

  return (
    <Fade in>
      <Grid
        container
        className={classes.row}
        justify="center"
        style={{ borderTop: "1px solid lightgray", marginBottom: 20 }}
      >
        <Grid
          item
          xs={12}
          className={classes.labelContainer}
        >
          <div id="label-product" style={{ backgroundColor:"white",width: "350px", height:"450px", border:"1px solid black", borderRadius:"5px", padding:"20px"}}>
            <h2>{name}</h2>
            <h4>Folder: {folder}</h4>
            <h4>Description: {description}</h4>
            <QRCode size={180} value={id} />
          </div>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleLabelSave}
            className={classes.saveButton}
          >
            {loading ? "Loading" : "Save Label"}
          </Button>
        </Grid>
      </Grid>
    </Fade>
  );
};
export default Label;
