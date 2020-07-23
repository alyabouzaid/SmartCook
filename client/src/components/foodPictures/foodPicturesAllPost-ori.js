import React from "react";
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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import {
  getAllFoodPicPost,
  deleteOneFoodPicPost,
  addLike,
  addComment,
  editPostDescription,
  editPostComment,
} from "../../actions/foodPicturesActions";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { deepPurple } from "@material-ui/core/colors";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import pic from "../login/landingPage.jpg";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
    width: theme.spacing(4),
    height: theme.spacing(4),
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

class FoodPicturesAllPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likeIconBgColor: "default",
      expanded: false,
      anchorEl: null,
      isInEditDescriptionMode: false,
      isInEditCommentMode: false,
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleClickLike = this.handleClickLike.bind(this);
    this.trimInitialForNameDisplay = this.trimInitialForNameDisplay.bind(this);
    this.generate = this.generate.bind(this);
    this.handleClickDropDownMenu = this.handleClickDropDownMenu.bind(this);
    this.handleCloseDropDownMenu = this.handleCloseDropDownMenu.bind(this);
    this.handleClickEditDescription = this.handleClickEditDescription.bind(
      this
    );
    this.handleClickEditComment = this.handleClickEditComment.bind(this);
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  handleClickLike() {
    this.setState({
      likeIconBgColor: "red",
    });
  }

  trimInitialForNameDisplay(fullName) {
    const initials = fullName
      .split(/\s/)
      .reduce((res, str) => (res += str.slice(0, 1)), "");

    return initials.toUpperCase();
  }

  handleClickEditDescription() {
    this.setState({
      isInEditDescriptionMode: !this.state.isInEditDescriptionMode,
    });
  }

  handleClickEditComment(email) {
    // console.log(JSON.stringify(email));
    email === this.props.userInfo.email
      ? //   : console.log("noooo");
        this.setState({
          isInEditCommentMode: !this.state.isInEditCommentMode,
        })
      : this.setState({
          isInEditCommentMode: this.state.isInEditCommentMode,
        });
  }

  generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  handleClickDropDownMenu(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleCloseDropDownMenu() {
    this.setState({ anchorEl: null });
  }

  componentDidMount() {
    this.props.getAllFoodPicPost();
  }

  render() {
    const { classes } = this.props;

    //     return (
    //       <div>
    //         <Header />
    //         {this.props.foodPicPost &&
    //           this.props.foodPicPost.allPost &&
    //           this.props.foodPicPost.allPost.map((item) => (
    //             <div>{item.description}</div>
    //           ))}
    //       </div>
    //     );
    //   }
    // }

    return (
      <div>
        {/* <div className="sweet-loading">
          <DotLoader
            css={override}
            size={100}
            color={"teal"}
            loading={this.props.foodPicPost.loading}
          />
        </div> */}

        {this.props.foodPicPost &&
          this.props.foodPicPost.allPost &&
          this.props.foodPicPost.allPost.map((item) => (
            <Card
              key={item._id}
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
                    {/* {item.postedByFirstName.substring(0, 1)} */}
                    {this.trimInitialForNameDisplay(item.postedByFullName)}
                  </Avatar>
                }
                // action={
                //   this.props.userInfo.email === item.postedByEmail ? (
                //     <IconButton
                //       aria-label="settings"
                //       onClick={() => {
                //         // console.log("testing:", this.props.userInfo.firstName);
                //         // console.log("testing2:", item._id);
                //         this.props.deleteOneFoodPicPost(
                //           item._id,
                //           // this.props.userInfo.firstName
                //           this.props.userInfo.email
                //         );
                //       }}
                //     >
                //       {/* <MoreVertIcon /> */}
                //       <DeleteIcon/>
                //     </IconButton>
                //   ) : (
                //     ""
                //   )
                action={
                  this.props.userInfo.email === item.postedByEmail ? (
                    <div>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={this.handleClickDropDownMenu}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        id="customized-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseDropDownMenu}
                        PaperProps={{
                          style: {
                            maxHeight: 20 * 4.5,
                            width: "10ch",
                          },
                        }}
                      >
                        <MenuItem
                          key={"edit"}
                          onClick={this.handleClickEditDescription}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          key={"delete"}
                          onClick={() => {
                            this.props.deleteOneFoodPicPost(
                              item._id,
                              this.props.userInfo.email
                            );
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    ""
                  )
                }
                title={
                  <Typography align="left" variant="h6" component="h2">
                    {item.postedByFullName}
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
                  key={image.asset_id}
                  className={classes.media}
                  image={image.secure_url}
                  title="food image"
                />
              ))}
              <CardActions disableSpacing className={classes.actions}>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    this.handleClickLike();
                    this.props.addLike(
                      item._id,
                      // this.props.userInfo.firstName.trim()
                      this.props.userInfo.email
                    );
                  }}
                  style={{ color: this.state.likeIconBgColor }}
                >
                  <FavoriteIcon />
                </IconButton>
                {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}

                <Typography>{item.likes.length} likes</Typography>
              </CardActions>

              {this.state.isInEditDescriptionMode &&
              this.props.userInfo.email === item.postedByEmail ? (
                <form
                  className={classes.editDescription}
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.setState({ isInEditDescriptionMode: false });
                    this.props.editPostDescription(item._id, e.target[0].value);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Edit post description"
                    style={{
                      width: 500,
                      fontSize: 15,
                      marginLeft: 12,
                      marginBottom: 10,
                      float: "left",
                    }}
                  />
                </form>
              ) : (
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
              )}

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
                  <List key={item._id}>
                    {this.generate(
                      <ListItem
                        onDoubleClick={() => {
                          this.handleClickEditComment(comment.postedByEmail);
                        }}

                        // comment.postedByEmail ===
                        // this.props.userInfo.email ? (
                        //   <form
                        //     className={classes.editComment}
                        //     onSubmit={(e) => {
                        //       e.preventDefault();
                        //       // this.props.editPostComment(item._id, comment._id, e.target[0].value);
                        //     }}
                        //   >
                        //     <input
                        //       type="text"
                        //       placeholder="Edit your comment"
                        //       style={{
                        //         border: "none",
                        //         width: 500,
                        //         fontSize: 15,
                        //         // display: "block",
                        //         marginLeft: 12,
                        //         marginBottom: 15,
                        //         float: "left",
                        //       }}
                        //     />
                        //   </form>
                        // ) : (
                        //   ""
                        // )
                        //}
                      >
                        {this.state.isInEditCommentMode ? (
                          <form
                            className={classes.editComment}
                            onSubmit={(e) => {
                              e.preventDefault();
                              this.setState({ isInEditCommentMode: false });
                              this.props.editPostComment(
                                item._id,
                                comment._id,
                                e.target[0].value
                              );
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Edit your comment"
                              style={{
                                width: 500,
                                fontSize: 15,
                                marginLeft: 0,
                                // marginBottom: 10,
                                float: "left",
                              }}
                            />
                          </form>
                        ) : (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar
                                className={classes.commentAvatar}
                                style={{
                                  marginRight: 0,
                                }}
                              >
                                {/* {comment.postedByFirstName.substring(0, 1)} */}
                                {this.trimInitialForNameDisplay(
                                  item.postedByFullName
                                )}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  align="left"
                                  variant="subtitle1"
                                  component="h2"
                                >
                                  {comment.postedByFullName +
                                    ": " +
                                    " " +
                                    comment.text}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )}
                        {/* <ListItemAvatar>
                          <Avatar
                            className={classes.commentAvatar}
                            style={{
                              marginRight: 0,
                            }}
                          >
                            {this.trimInitialForNameDisplay(
                              comment.postedByFullName
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              align="left"
                              variant="subtitle1"
                              component="h2"
                            >
                              {comment.postedByFullName +
                                ": " +
                                " " +
                                comment.text}
                            </Typography>
                          }
                        /> */}
                      </ListItem>
                    )}
                  </List>
                ))}

                <form
                  className={classes.comment}
                  onSubmit={(e) => {
                    e.preventDefault();
                    // this.setState({ dense: e.target.checked });
                    this.props.addComment(
                      item._id,
                      e.target[0].value,
                      this.props.userInfo.firstName,
                      this.props.userInfo.fullName,
                      this.props.userInfo.email
                    );
                  }}
                >
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFoodPicPost: () => dispatch(getAllFoodPicPost()),
    deleteOneFoodPicPost: (idPayload, email) =>
      dispatch(deleteOneFoodPicPost(idPayload, email)),
    addLike: (idPayload, email) => dispatch(addLike(idPayload, email)),
    addComment: (idPayload, comment, userFirstName, userFullName, email) =>
      dispatch(
        addComment(idPayload, comment, userFirstName, userFullName, email)
      ),
    editPostDescription: (idPayload, editedPostDescription) =>
      dispatch(editPostDescription(idPayload, editedPostDescription)),
    editPostComment: (idPayload, commentId, editedComment) =>
      dispatch(editPostComment(idPayload, commentId, editedComment)),
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
)(FoodPicturesAllPost);
