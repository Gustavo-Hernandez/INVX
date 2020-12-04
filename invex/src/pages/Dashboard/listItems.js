import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import WarningIcon from '@material-ui/icons/Warning';
import TocIcon from '@material-ui/icons/Toc';
import FolderIcon from '@material-ui/icons/Folder';
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
    <Link style={{textDecoration:"none", color:"black"}} to="/folders">
      <ListItem button>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Folders" />
      </ListItem>
    </Link>
    <Link style={{textDecoration:"none", color:"black"}} to="/lowstock">
      <ListItem button>
        <ListItemIcon>
          <WarningIcon />
        </ListItemIcon>
        <ListItemText primary="Low Stock" />
      </ListItem>
    </Link>
    <Link style={{textDecoration:"none", color:"black"}} to="/logs">
      <ListItem button>
        <ListItemIcon>
          <TocIcon />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItem>
    </Link>
  </div>
);
