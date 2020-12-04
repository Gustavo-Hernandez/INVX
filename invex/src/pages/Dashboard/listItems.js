import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link style={{textDecoration:"none", color:"black"}} to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link style={{textDecoration:"none", color:"black"}} to="/products">
      <ListItem button>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
    </Link>
    <Link style={{textDecoration:"none", color:"black"}} to="/users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
  </div>
);
