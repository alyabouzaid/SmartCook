import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

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
  contentHeader: {
    color: "#4db6ac",
    fontFamily: "Grand Hotel",
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function GridPost(props) {
  const classes = useStyles();

  return (
    <div>
      {props.isAuthenticated ? (
        <Card className={classes.card} variant="outline" p={1}>
          <CardContent>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Link
                to={props.content.link}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box style={{ marginLeft: 10 }}>{props.content.icon}</Box>
              </Link>
            </Box>

            <Typography variant="h5" color="inherit" paragraph>
              {props.content.title}
            </Typography>

            <Typography component="p">{props.content.description}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.card} variant="outline" p={1}>
          <CardContent>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Box style={{ marginLeft: 10 }}>{props.content.icon}</Box>
            </Box>

            <Typography variant="h5" color="inherit" paragraph>
              {props.content.title}
            </Typography>

            <Typography component="p">{props.content.description}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
