import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    float: "center",
    padding: 20,
    marginTop: 20,
    fontSize: 15,
    color: "#5c677d",
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.right}>
          &copy; 2020 - created by SmartCook team
        </div>
      </div>
    </div>
  );
}
