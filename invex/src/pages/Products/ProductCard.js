import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 180,
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
  buttonDelete: {
    color: "#BA262B",
  },
});

const ProductCard = ({
  name,
  units,
  unitPrice,
  description,
  url,
  id,
  handleDelete,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          alt={name}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
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
          <Typography variant="body2" color="textSecondary" component="p">
            {description || "No description provided."}
          </Typography>
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
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
