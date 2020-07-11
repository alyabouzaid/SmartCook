import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Header from "../login/Header";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { loadUserData } from "../../actions/userActions";
import {
  getAllFoodPicPost,
  deleteOneFoodPicPost,
  updateLike,
  updateComment,
  // deleteAllFoodPicPosts,
} from "../../actions/foodPicturesActions";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { deepPurple } from "@material-ui/core/colors";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";

const useStyles = (theme) => ({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
  },
  root: {
    maxWidth: 700,
  },
  header: {
    marginLeft: 0,
    fontSize: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  typography: {
    body2: {
      marginTop: 5,
    },
  },
  action: {
    marginBottm: 0,
  },
  commentInput: {
    justifyContent: "left",
  },
  commentAvatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  content: {
    marginTop: 0,
  },
});

const override = css`
  display: inline-block;
  margin: 0;
  justifycontent: center;
  alignitems: center;
`;

class FoodPictures extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likeIconBgColor: "default",
      expanded: false,
      // dense: false,
    };

    this.handleClickLike = this.handleClickLike.bind(this);
    this.generate = this.generate.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  handleClickLike() {
    this.setState({
      likeIconBgColor: "red",
    });
  }

  generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  componentDidMount() {
    this.props.loadUserData();
    this.props.getAllFoodPicPost();
  }

  render() {
    const { classes } = this.props;

    // return (
    //   <div>
    //     <Header />
    //     {this.props.foodPicPost &&
    //       this.props.foodPicPost.foodPicPosts &&
    //       this.props.foodPicPost.foodPicPosts.map((item) => (
    //         <div>{item.description}</div>
    //       ))}
    //   </div>
    // );

    return (
      <div>
        <Header />
        {/* <div className="sweet-loading">
          <DotLoader
            css={override}
            size={100}
            color={"teal"}
            loading={this.props.foodPicPost.loading}
          />
        </div> */}
        {/* <GridList padding={30} className={classes.gridList}> */}
        {this.props.foodPicPost &&
          this.props.foodPicPost.foodPicPosts &&
          this.props.foodPicPost.foodPicPosts.map((item) => (
            <Card
              className={classes.root}
              style={{
                marginTop: 30,
                marginBottom: 30,
                marginLeft: 450,
              }}
            >
              <CardHeader
                className={classes.header}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item.postedBy.substring(0, 1)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    {/* <MoreVertIcon /> */}
                    <DeleteIcon
                      onClick={() => this.props.deleteOneFoodPicPost(item._id)}
                    />
                  </IconButton>
                }
                title={
                  <Typography align="left" variant="h6" component="h2">
                    {item.postedBy}
                  </Typography>
                }
                subheader={
                  <Typography align="left" variant="subtitle2" component="h2">
                    {item.dateTime}
                  </Typography>
                }
              />
              {item.image.map((image) => (
                <CardMedia
                  className={classes.media}
                  image={image.secure_url}
                  title="food image"
                />
              ))}
              <CardActions disableSpacing className={classes.actions}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon
                    onClick={() => {
                      this.handleClickLike();
                      this.props.updateLike(
                        item._id,
                        this.props.userInfo.firstName
                      );
                    }}
                    style={{ color: this.state.likeIconBgColor }}
                  />
                </IconButton>
                {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
                <Typography>{item.likes.length} likes</Typography>
              </CardActions>

              <CardContent className={classes.content}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  component="p"
                  align="left"
                >
                  {item.description}
                </Typography>
              </CardContent>

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                {/* <div className={classes.commentList}> */}
                {item.comments.map((comment) => (
                  <List>
                    {this.generate(
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            className={classes.commentAvatar}
                            style={{
                              marginRight: 0,
                            }}
                          >
                            {comment.postedBy.substring(0, 1)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          // primary="Single-line item"
                          // // secondary={secondary ? 'Secondary text' : null}
                          primary={
                            <Typography
                              align="left"
                              variant="subtitle1"
                              component="h2"
                            >
                              {comment.postedBy + ": " + " " + comment.text}
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>
                ))}

                {/* <div>
                {item.comments.map(
                  (comment) => comment.postedBy + ": " + comment.text
                )}
              </div> */}
                <form
                  className={classes.comment}
                  onSubmit={(e) => {
                    e.preventDefault();
                    // this.setState({ dense: e.target.checked });
                    this.props.updateComment(
                      item._id,
                      e.target[0].value,
                      this.props.userInfo.firstName
                    );
                  }}
                >
                  {/* <input
                  className={classes.commentInput}
                  type="text"
                  placeholder="Add a comment"
                  value={item.comment}
                  style={{
                    border: "none",
                    fontSize: 15,
                    // display: "block",
                    marginLeft: 12,
                    float: "left",
                  }}
                /> */}
                  <TextField
                    id="standard-basic"
                    label="Add a comment"
                    style={{
                      border: "none",
                      width: 500,
                      fontSize: 15,
                      // display: "block",
                      marginLeft: 12,
                      marginBottom: 15,
                      float: "left",
                    }}
                  />
                </form>
              </Collapse>
            </Card>
          ))}
        {/* </GridList> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserData: () => dispatch(loadUserData()),
    getAllFoodPicPost: () => dispatch(getAllFoodPicPost()),
    deleteOneFoodPicPost: (idPayload) =>
      dispatch(deleteOneFoodPicPost(idPayload)),
    updateLike: (idPayload, username) =>
      dispatch(updateLike(idPayload, username)),
    updateComment: (idPayload, comment, username) =>
      dispatch(updateComment(idPayload, comment, username)),
    // deleteAllFoodPicPosts: (idPayload) =>
    //   dispatch(deleteAllFoodPicPosts(idPayload)),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
    foodPicPost: state.foodPicturesStore,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(FoodPictures);
