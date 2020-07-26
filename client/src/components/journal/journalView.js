import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  loadJournalsData,
  addNewJournalData,
  deleteOneJournalData,
} from "../../actions/journalActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import parse from "html-react-parser";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/all";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

const useStyles = (theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
    // marginLeft: "3%",
    justifyContent: "center",
  },
  cardGrid: {
    // paddingTop: theme.spacing(8), // removed this
    // paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  //   cardMedia: {
  //     height: 100, // increases image height
  //     paddingTop: "56.25%", // 16:9
  //   },
  cardContent: {
    flexGrow: 1,
    // height: '150px',
    whiteSpace: "wrap",
    overflow: "hidden",
    minWidth: "0",
    textOverflow: "ellipsis", // doesn't work
  },
  button: {
    textAlign: "left",
    // width: "100%",
    textTransform: "capitalize",
    justifyContent: "left", // aligns button to left of container
    fontSize: "16px",
  },
  // root: {
  //     width: '70%',
  // },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  test: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "right",
  },
});

class JournalView extends Component {
  componentDidMount() {
    this.props.loadJournalsData(this.props.userInfo.email);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <p
          style={{
            textAlign: "left",
            backgroundColor: "transparent",
            margin: "3",
            fontSize: "24px",
          }}
        />

        <Link
          to={"/journal"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <label htmlFor="icon-button-file" style={{ justifyContent: "right" }}>
            {/*TODO: change icon position by modifying right param: 35 or 215*/}
            <IconButton
              aria-label="upload picture"
              component="span"
              color="black"
              style={{ position: "fixed", right: "5%" }}
            >
              {/*TODO: change icon size by modifying width and height*/}
              <AddIcon size="large" style={{ width: 100, height: 100 }} />
            </IconButton>
          </label>
        </Link>
        <p
          style={{
            textAlign: "left",
            backgroundColor: "transparent",
            margin: "3",
            fontSize: "24px",
          }}
        />
        <div>
          <Grid container component="main" className={classes.root} spacing={5}>
            <Grid style={{ textAlign: "right" }} item xs={false} sm={4} md={12}>
              <div className={classes.test}>
                <p
                  style={{
                    textAlign: "left",
                    backgroundColor: "transparent",
                    margin: "3",
                    fontSize: "24px",
                  }}
                />
              </div>
            </Grid>

            <Grid style={{ textAlign: "right" }} item xs={false} sm={4} md={12}>
              <div className={classes.test}>
                <p
                  style={{
                    textAlign: "left",
                    backgroundColor: "transparent",
                    margin: "3",
                    fontSize: "24px",
                  }}
                />
              </div>
            </Grid>

            {this.props.journals.map((journal) => (
              <Grid item xs={false} sm={4} md={7}>
                <Card
                  key={journal.id}
                  className={classes.card}
                  varient="outlined"
                >
                  <CardHeader
                    action={
                      // this.props.userInfo.email === journal.email &&
                      <IconButton aria-label="settings">
                        <DeleteIcon
                          onClick={() =>
                            this.props.deleteOneJournalData(journal._id)
                          }
                        />
                      </IconButton>
                    }
                    title={
                      <Typography align="left" variant="h6" component="h2">
                        {journal.title}
                      </Typography>
                    }
                    subheader={
                      <Typography
                        align="left"
                        variant="subtitle2"
                        component="h2"
                      >
                        {journal.author}{" "}
                        {journal.createdAt.slice(0, -5).replace("T", " ")}
                      </Typography>
                    }
                  />
                  {journal.images.length > 0 && (
                    <CardMedia
                      className={classes.media}
                      image={journal.images[0].secure_url}
                      title={journal.title}
                    />
                  )}
                  <CardContent>
                    <div style={{ textAlign: "left" }}>
                      {parse(journal.body)}
                    </div>
                  </CardContent>
                  {/*TODO: add functionality to buttons*/}
                  {/*<CardActions>*/}
                  {/*    <Button size="small" color="primary">*/}
                  {/*        Share*/}
                  {/*    </Button>*/}
                  {/*    <Button size="small" color="primary">*/}
                  {/*        Learn More*/}
                  {/*    </Button>*/}
                  {/*</CardActions>*/}
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //name is by convention
  return { journals: state.journalsStore.journals, userInfo: state.userStore }; //now it will appear as props
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, {
    loadJournalsData,
    addNewJournalData,
    deleteOneJournalData,
  })
)(JournalView);
