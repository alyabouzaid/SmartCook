import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getProfilePic } from "../../actions/userProfilePicActions";
import {
  getAllFoodPicPost,
  deleteOneFoodPicPost,
  addLike,
  addComment,
  editPostDescription,
  editPostComment,
  deleteComment,
} from "../../actions/foodPicturesActions";
import compose from "recompose/compose";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyles = (theme) => ({
  root: {
    display: "block",
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    marginLeft: 0,
    fontSize: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
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
  typography: {
    body2: {
      marginTop: 5,
    },
  },
  action: {
    marginBottm: 0,
  },
  commentTextField: {
    border: "none",
    width: 500,
    fontSize: 15,
    marginLeft: 12,
    marginBottom: 15,
    float: "left",
  },
  editCommentField: {
    width: 500,
    fontSize: 15,
    marginLeft: 0,
    float: "left",
  },
  commentAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  commentUserName: {
    color: "#4db6ac",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
  },
  editDescriptionField: {
    width: 500,
    fontSize: 15,
    marginLeft: 12,
    marginBottom: 10,
    float: "left",
  },
  content: {
    marginTop: 0,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
});

class FoodPicturesPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likeIconBgColor: "default",
      expanded: false,
      anchorEl: null,
      anchorElLikesHover: null,
      isInEditDescriptionMode: false,
      showEditOrDeleteCommentBtn: false,
      isInEditCommentMode: false,
      selectedCommentId: null,
    };
  }

  componentDidMount() {
    this.props.getProfilePic();
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  handleClickLike = () => {
    this.setState({
      likeIconBgColor: "red",
    });
  };

  handlePopoverOpen = (event) => {
    this.setState({
      anchorElLikesHover: event.currentTarget,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorElLikesHover: null,
    });
  };

  handleClickEditDescription = () => {
    this.setState({
      isInEditDescriptionMode: !this.state.isInEditDescriptionMode,
    });
  };

  handleDoubleClickComment = (email, commentId) => {
    email === this.props.userInfo.email
        ? this.setState({
          showEditOrDeleteCommentBtn: !this.state.showEditOrDeleteCommentBtn,
          selectedCommentId: commentId,
        })
        : this.setState({
          showEditOrDeleteCommentBtn: this.state.showEditOrDeleteCommentBtn,
        });
  };

  generate = (element) => {
    return [0].map((value) =>
        React.cloneElement(element, {
          key: value,
        })
    );
  };

  handleClickDropDownMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleCloseDropDownMenu = () => {
    this.setState({ anchorEl: null });
  };

  renderVertIconButtonIfMatchUser = () => {
    return (
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
                  width: "18ch",
                },
              }}
          >
            <MenuItem key={"edit"} onClick={this.handleClickEditDescription}>
              Edit caption
            </MenuItem>
            <MenuItem
                key={"delete"}
                onClick={() => {
                  this.props.deleteOneFoodPicPost(
                      this.props.item._id,
                      this.props.userInfo.email
                  );
                }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
    );
  };

  renderEditOrDelBtnForComments = (item, comment) => {
    const { classes } = this.props;
    return (
        <ListItem>
          <ListItemAvatar>
            {comment.postedByUploadedPic ? (
                <Avatar
                    className={classes.commentAvatar}
                    style={{
                      marginRight: 0,
                    }}
                    alt={comment.postedByFullName}
                    src={comment.postedByUploadedPic}
                />
            ) : (
                <Avatar
                    className={classes.commentAvatar}
                    style={{
                      marginRight: 0,
                    }}
                    alt={comment.postedByFullName}
                    src={comment.postedByGoogleDefaultPic}
                />
            )}
          </ListItemAvatar>
          <ListItemText
              primary={
                <div style={{ display: "flex" }}>
                  <Typography className={classes.commentUserName} component="h2">
                    {`${comment.postedByFullName}: \u00A0`}
                  </Typography>
                  <Typography className={classes.commentText} component="h2">
                    {`${comment.text}`}
                  </Typography>
                </div>
              }
          />
          <IconButton
              aria-label="edit"
              onClick={() => {
                this.setState({ showEditOrDeleteCommentBtn: false });
                this.handleClickEditComment();
              }}
          >
            <EditOutlinedIcon />
          </IconButton>

          <IconButton
              aria-label="delete"
              onClick={() => {
                this.setState({ showEditOrDeleteCommentBtn: false });
                this.props.deleteComment(this.props.item._id, comment._id);
              }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </ListItem>
    );
  };

  renderDefaultComment = (item, comment) => {
    const { classes } = this.props;

    return (
        <ul>
          <li style={{ listStyle: "none" }}>
            <Box display="flex" justifyContent="left">
              {comment.postedByUploadedPic ? (
                  <Avatar
                      className={classes.commentAvatar}
                      style={{
                        marginRight: 5,
                      }}
                      alt={comment.postedByFullName}
                      src={comment.postedByUploadedPic}
                  />
              ) : (
                  <Avatar
                      className={classes.commentAvatar}
                      style={{
                        marginRight: 5,
                      }}
                      alt={comment.postedByFullName}
                      src={comment.postedByGoogleDefaultPic}
                  />
              )}
              <Typography className={classes.commentUserName} component="h2">
                {`${comment.postedByFullName}: \u00A0`}
              </Typography>
              <Typography className={classes.commentText} component="h2">
                {`${comment.text}`}
              </Typography>
            </Box>
          </li>
        </ul>
    );
  };

  handleClickEditComment = () => {
    this.setState({
      isInEditCommentMode: !this.state.isInEditCommentMode,
    });
  };

  renderEditComment = (item, comment) => {
    const { classes } = this.props;

    return (
        <form
            className={classes.editComment}
            onSubmit={(e) => {
              e.preventDefault();
              this.setState({ isInEditCommentMode: false });
              this.props.editPostComment(item._id, comment._id, e.target[0].value);
            }}
        >
          <input
              className={classes.editCommentField}
              type="text"
              placeholder="Edit your comment"
          />
        </form>
    );
  };

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorElLikesHover);

    return (
        <div className={classes.root}>
          <Card
              key={this.props.item._id}
              className={classes.card}
              style={{
                maxWidth: this.props.cardWidth,
                marginTop: 30,
                marginBottom: 30,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
          >
            <CardHeader
                className={classes.header}
                avatar={
                  this.props.item.postedByUploadedPic ? (
                      <Avatar
                          alt={this.props.item.postedByFullName}
                          src={this.props.item.postedByUploadedPic}
                      />
                  ) : (
                      <Avatar
                          alt={this.props.item.postedByFullName}
                          src={this.props.item.postedByGoogleDefaultPic}
                      />
                  )
                }
                action={
                  this.props.userInfo.email === this.props.item.postedByEmail
                      ? this.renderVertIconButtonIfMatchUser()
                      : ""
                }
                title={
                  <Typography align="left" variant="h6" component="h2">
                    {this.props.item.postedByFullName}
                  </Typography>
                }
                subheader={
                  <Typography
                      align="left"
                      variant="subtitle2"
                      component="h2"
                      style={{ color: "#4db6ac" }}
                  >
                    {this.props.item.dateTime}
                  </Typography>
                }
            />
            {this.props.item.image.map((image) => (
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
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                  onClick={() => {
                    this.handleClickLike();
                    this.props.addLike(
                        this.props.item._id,
                        this.props.userInfo.email,
                        this.props.userInfo.fullName
                    );
                  }}
                  style={{ color: this.state.likeIconBgColor }}
              >
                <FavoriteIcon />
              </IconButton>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={this.state.anchorElLikesHover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={this.handlePopoverClose}
                  disableRestoreFocus
              >
                <Typography style={{ textAlign: "left", fontSize: 12 }}>
                  {this.props.item.likesByFullName.map((name) => (
                      <li style={{ listStyle: "none" }}>{name}</li>
                  ))}
                </Typography>
              </Popover>

              <Typography>{this.props.item.likesLength} likes</Typography>
            </CardActions>

            {this.state.isInEditDescriptionMode &&
            this.props.userInfo.email === this.props.item.postedByEmail ? (
                <form
                    className={classes.editDescription}
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.setState({ isInEditDescriptionMode: false });
                      this.props.editPostDescription(
                          this.props.item._id,
                          e.target[0].value
                      );
                    }}
                >
                  <input
                      className={classes.editDescriptionField}
                      type="text"
                      placeholder="Edit post description"
                  />
                </form>
            ) : (
                <CardContent className={classes.content}>
                  <Typography
                      // variant="h6"
                      color="textSecondary"
                      component="p"
                      align="left"
                      style={{ fontSize: this.props.cardCaptionSize }}
                  >
                    {this.props.item.description}
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

            {this.state.expanded ? (
                ""
            ) : this.props.item.comments.length ? (
                <div>
                  <Typography
                      variant="subtitle2"
                      align="center"
                      style={{ color: "#adb5bd", marginBottom: 5 }}
                  >
                    view comments &#40;{this.props.item.comments.length}&#41;
                  </Typography>
                </div>
            ) : (
                <Typography
                    variant="subtitle2"
                    align="center"
                    style={{ color: "#adb5bd", marginBottom: 5 }}
                >
                  view comments &#40;0&#41;
                </Typography>
            )}
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              {this.props.item.comments.map((comment) => (
                  <List>
                    <ListItem
                        key={comment._id}
                        onDoubleClick={() => {
                          this.handleDoubleClickComment(
                              comment.postedByEmail,
                              comment._id
                          );
                        }}
                    >
                      {this.state.showEditOrDeleteCommentBtn &&
                      this.state.selectedCommentId === comment._id
                          ? this.renderEditOrDelBtnForComments(
                              this.props.item,
                              comment
                          )
                          : this.state.selectedCommentId === comment._id &&
                          this.state.isInEditCommentMode
                              ? this.renderEditComment(this.props.item, comment)
                              : this.renderDefaultComment(this.props.item, comment)}
                    </ListItem>
                  </List>
              ))}

              <form
                  className={classes.comment}
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.props.addComment(
                        this.props.item._id,
                        e.target[0].value,
                        this.props.userInfo.firstName,
                        this.props.userInfo.fullName,
                        this.props.userInfo.email,
                        this.props.userInfo.googleDefaultPic,
                        this.props.userInfo.userUploadedPic
                    );
                    e.target.reset();
                  }}
              >
                <TextField
                    className={classes.commentTextField}
                    id="standard-basic"
                    label="Add a comment"
                />
              </form>
            </Collapse>
          </Card>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFoodPicPost: () => dispatch(getAllFoodPicPost()),
    deleteOneFoodPicPost: (idPayload, email) =>
        dispatch(deleteOneFoodPicPost(idPayload, email)),
    addLike: (idPayload, email, name) =>
        dispatch(addLike(idPayload, email, name)),
    addComment: (
        idPayload,
        comment,
        userFirstName,
        userFullName,
        email,
        googleDefaultPic,
        userUploadedPic
    ) =>
        dispatch(
            addComment(
                idPayload,
                comment,
                userFirstName,
                userFullName,
                email,
                googleDefaultPic,
                userUploadedPic
            )
        ),
    editPostDescription: (idPayload, editedPostDescription) =>
        dispatch(editPostDescription(idPayload, editedPostDescription)),
    editPostComment: (idPayload, commentId, editedComment) =>
        dispatch(editPostComment(idPayload, commentId, editedComment)),
    deleteComment: (idPayload, commentId) =>
        dispatch(deleteComment(idPayload, commentId)),
    getProfilePic: () => dispatch(getProfilePic()),
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
)(FoodPicturesPost);
