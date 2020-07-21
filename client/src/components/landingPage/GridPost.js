import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(() => ({
  card: {
    width: 300,
    height: 300,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    typography: {
      h4: {
        color: "#b2dfdb",
      },
    },
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function GridPost(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card} variant="outline" p={1}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            color="inherit"
            style={{ color: "#4db6ac" }}
          >
            {props.content.heading}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {props.content.title}
          </Typography>
          <Typography component="p">{props.content.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
