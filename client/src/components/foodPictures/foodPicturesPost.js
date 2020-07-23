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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
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
  deleteComment,
} from "../../actions/foodPicturesActions";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { deepPurple } from "@material-ui/core/colors";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";

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

class FoodPicturesPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likeIconBgColor: "default",
      expanded: false,
      anchorEl: null,
      isInEditDescriptionMode: false,
      showEditOrDeleteCommentBtn: false,
      isInEditCommentMode: false,
      selectedCommentId: null,
    };
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

  trimInitialForNameDisplay = (fullName) => {
    const initials = fullName
      .split(/\s/)
      .reduce((res, str) => (res += str.slice(0, 1)), "");

    return initials.toUpperCase();
  };

  handleClickEditDescription = () => {
    this.setState({
      isInEditDescriptionMode: !this.state.isInEditDescriptionMode,
    });
  };

  handleDoubleClickComment = (email, commentId) => {
    // console.log(JSON.stringify(email));
    email === this.props.userInfo.email
      ? //   : console.log("noooo");
        this.setState({
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
          <Avatar
            className={classes.commentAvatar}
            style={{
              marginRight: 0,
            }}
          >
            {this.trimInitialForNameDisplay(item.postedByFullName)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography align="left" variant="subtitle1" component="h2">
              {comment.postedByFullName + ": " + " " + comment.text}
            </Typography>
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
      <ListItem>
        <ListItemAvatar>
          <Avatar
            className={classes.commentAvatar}
            style={{
              marginRight: 0,
            }}
          >
            {/* {comment.postedByFirstName.substring(0, 1)} */}
            {this.trimInitialForNameDisplay(comment.postedByFullName)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography align="left" variant="subtitle1" component="h2">
              {comment.postedByFullName + ": " + " " + comment.text}
            </Typography>
          }
        />
      </ListItem>
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
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card
          key={this.props.item._id}
          className={classes.root}
          style={{
            maxWidth: this.props.cardWidth,
            marginTop: 30,
            marginBottom: 30,
            // marginLeft: this.props.cardLeftMargin,
            // marginRight: this.props.cardRightMargin,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {this.trimInitialForNameDisplay(
                  this.props.item.postedByFullName
                )}
              </Avatar>
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
              <Typography align="left" variant="subtitle2" component="h2">
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
              onClick={() => {
                this.handleClickLike();
                this.props.addLike(
                  this.props.item._id,
                  this.props.userInfo.email
                );
              }}
              style={{ color: this.state.likeIconBgColor }}
            >
              <FavoriteIcon />
            </IconButton>
            <Typography>{this.props.item.likes.length} likes</Typography>
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
                  marginLeft: 12,
                  marginBottom: 15,
                  float: "left",
                }}
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
    addLike: (idPayload, email) => dispatch(addLike(idPayload, email)),
    addComment: (idPayload, comment, userFirstName, userFullName, email) =>
      dispatch(
        addComment(idPayload, comment, userFirstName, userFullName, email)
      ),
    editPostDescription: (idPayload, editedPostDescription) =>
      dispatch(editPostDescription(idPayload, editedPostDescription)),
    editPostComment: (idPayload, commentId, editedComment) =>
      dispatch(editPostComment(idPayload, commentId, editedComment)),
    deleteComment: (idPayload, commentId) =>
      dispatch(deleteComment(idPayload, commentId)),
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
)(FoodPicturesPost);
