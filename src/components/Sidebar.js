import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const drawerWidth = 210;
const useStyles = makeStyles(() => {
  return {
    page: {
      background: "#f9f9f9",
      width: "10%",
    },
    drawer: {
      "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
        backgroundColor: "#2a2a2a",
        color: "white",
        borderRight: "1px solid black",
        paddingTop: 60,
        display: "flex",
        alignItems: "center",
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  };
});

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" style={{ marginTop: -40, marginBottom: 20 }}>
            Welcome!
          </Typography>
        </div>
        <List>
          <ListItem key="Users" button onClick={() => history.push("/user")}>
            <ListItemText primary="Users" />
          </ListItem>

          <ListItem
            key="Restaurants"
            button
            onClick={() => history.push("/restaurant")}
          >
            <ListItemText primary="Restaurants" />
          </ListItem>
          <ListItem
            key="Reviews"
            button
            onClick={() => history.push("/review")}
          >
            <ListItemText primary="Reviews" />
          </ListItem>
          <ListItem key="Reply" button onClick={() => history.push("/reply")}>
            <ListItemText primary="Reply" />
          </ListItem>
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
