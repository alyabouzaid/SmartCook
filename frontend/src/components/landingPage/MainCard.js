import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import pic from "./landingPage.jpg";

const useStyles = makeStyles((theme) => ({
  mainCard: {
    position: "relative",
    // backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "./gallery/landingPage.jpg",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 320,
  },
  mainCardTitle: {
    paddingTop: 50,
    paddingBottom: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainCardContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function MainCard(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.mainCard}
      style={{ backgroundImage: `url(${pic})` }}
    >
      {<img style={{ display: "none" }} src={pic} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={7}>
          <div className={classes.mainCardContent}>
            {props.isAuthenticated ? (
              <div className={classes.mainCardTitleContainer}>
                <Typography
                  className={classes.mainCardTitle}
                  variant="h4"
                  color="inherit"
                  gutterBottom
                >
                  {props.card.title_isAuthenticated}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph>
                  {props.card.description_isAuthenticated}
                </Typography>
              </div>
            ) : (
              <div className={classes.mainCardTitleContainer}>
                <Typography
                  className={classes.mainCardTitle}
                  variant="h4"
                  color="inherit"
                  gutterBottom
                >
                  {props.card.title}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph>
                  {props.card.description}
                </Typography>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
