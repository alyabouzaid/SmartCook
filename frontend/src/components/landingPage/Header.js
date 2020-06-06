import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "#e0f2f1",
    // "#e3f2fd",
    color: "black",
    position: "sticky",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  websiteTitle: {
    flex: 1,
    marginLeft: 15,
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.websiteTitle}>
          SmartCook
        </Typography>
        {/* </Button> */}
        <List className="menu-list">
          {props.isAuthenticated ? (
            <ListItem className="menu-item">
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                onClick=""
              >
                Inventory
              </Button>
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                onClick=""
              >
                Recommender
              </Button>
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                onClick=""
              >
                Journal
              </Button>
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                onClick=""
              >
                Food Pictures
              </Button>
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                onClick={props.logout}
              >
                Logout
              </Button>
            </ListItem>
          ) : (
            <ListItem>
              <Button href="" color="inherit" target="_blank" size="small">
                Home
              </Button>
              <Button href="" color="inherit" target="_blank" size="small">
                About
              </Button>
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                onClick={props.login}
              >
                Login
              </Button>
              <Button
                href=""
                color="inherit"
                target="_blank"
                size="small"
                style={{
                  color: "#00bfa5",
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Button>
            </ListItem>
          )}
        </List>
      </Toolbar>
    </AppBar>
  );
}
