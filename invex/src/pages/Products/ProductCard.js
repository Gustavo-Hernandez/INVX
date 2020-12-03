import React, { useState } from "react";
import {
  Popover,
  makeStyles,
  Paper,
  InputBase,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ExposureIcon from "@material-ui/icons/Exposure";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 350,
    marginTop: 12,
    marginLeft: 5,
    marginRight: 5,
    float: "left",
  },
  media: {
    height: 140,
    backgroundColor: "#DEF3FD",
    objectFit: "contain",
    padding: 2,
  },
  numbers: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  description:{
    width:"100%",
    display:"flex",
    flexWrap:"wrap",
    overflow:"hidden",
    height: 40,
  },
  chip: {
    marginBottom: 2,
  },
  buttonDelete: {
    color: "#BA262B",
  },
  inputContainer: {
    height: "100%",
    padding: "2x 4px",
    display: "flex",
    alignItems: "center",
    borderTop: "3px solid lightblue",
  },
  input: {
    marginLeft: theme.spacing(1),
    width: 100,
    flex: 1,
  },
}));

const ProductCard = ({
  name,
  units,
  unitPrice,
  description,
  url,
  id,
  handleDelete,
  handleUpdateUnits,
  folder,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newUnits, setNewUnits] = useState(units);

  const handleUnitClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUnitChange = (e) => {
    let nUnits = parseFloat(e.target.value);
    if (nUnits >= 0) {
      setNewUnits(nUnits);
    }
  };

  const handleSubmit = () =>{
    if (newUnits !== units) {
      handleUpdateUnits(id, newUnits);
    }
    handleClose();
  }

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  return (
    <Card className={classes.root}>
      <Popover
        id={ids}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper component="form" className={classes.inputContainer}>
          <InputBase
            className={classes.input}
            placeholder="Set Units"
            autoCorrect="none"
            type="number"
            onChange={handleUnitChange}
            value={newUnits}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Paper>
      </Popover>
      <CardActionArea style={{width:"100%"}}>
        <CardMedia
          className={classes.media}
          image={url}
          alt={name}
          title="Contemplative Reptile"
        />
        <CardContent style={{width:"100%", paddingBottom:0, marginBottom:0}}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <div className={classes.chip}>{`Folder: ${folder}`}</div>
          <div className={classes.numbers}>
            <span>
              <Typography variant="subtitle1" component="p">
                ${unitPrice}
              </Typography>
            </span>
            <span>
              <Typography variant="subtitle1" component="p">
                Units: {units}
              </Typography>
            </span>
          </div>
          <div className={classes.description}>
          <Typography variant="body2" color="textSecondary" component="p">
            {description || "No description provided."}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="delete"
          className={classes.buttonDelete}
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleUnitClick}
          color="primary"
          aria-label="set units"
        >
          <ExposureIcon />
        </IconButton>
        <Link to={`/products/${id}`}>
        <IconButton
          color="primary"
          aria-label="set units"
        >
          <MoreHorizIcon />
        </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
