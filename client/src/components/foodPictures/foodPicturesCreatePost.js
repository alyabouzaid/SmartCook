import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  uploadImageAndCreatePost,
  getAllFoodPicPost,
} from "../../actions/foodPicturesActions";
import compose from "recompose/compose";
import "../../index.css";
import { TextField } from "@material-ui/core";
import { FaImage } from "react-icons/all";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

const useStyles = (theme) => ({
  rootCardTitle: {
    marginTop: 12,
  },
  description: {
    marginBottom: 20,
    justifyContent: "center",
    marginLeft: 90,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  uploadIcon: {
    marginLeft: 140,
  },
  paper: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

class FoodPicturesCreatePost extends React.Component {
  myInput = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      description: "",
      image: {
        preview: "",
        raw: "",
      },
    };

    this.inputRef = null;
  }

  handleChange = (e) => {
    if (e.target.files.length) {
      this.setState({
        image: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
      });
    }
  };

  paperComponent = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
          <Paper {...props} />
        </Draggable>
    );
  };

  handleClick = () => {
    this.props.uploadProfilePicImage(
        this.state.image.raw,
        this.props.userInfo.email
    );
    this.props.isClose();
  };

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Dialog
              classes={{ paper: classes.paper }}
              open={this.props.isOpen}
              onClose={this.props.isClose}
              PaperComponent={this.paperComponent}
              aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle
                style={{
                  cursor: "move",
                }}
                id="draggable-dialog-title"
            >
              <Typography
                  className={classes.rootCardTitle}
                  variant="h5"
                  component="p"
                  style={{ fontFamily: "Grand Hotel" }}
              >
                Food Picture Post
              </Typography>
            </DialogTitle>

            <DialogContent>
              <form className={classes.description}>
                <TextField
                    multiline
                    type="text"
                    placeholder="Enter post description"
                    value={this.state.description}
                    onChange={(e) => this.setState({ description: e.target.value })}
                />
              </form>

              <div className={classes.image}>
                {this.state.image.preview ? (
                    <img
                        src={this.state.image.preview}
                        alt="dummy"
                        width="300"
                        height="300"
                    />
                ) : (
                    <div>
                      <input
                          type="file"
                          id="singleUpload"
                          className="inputfile"
                          onChange={(e) => this.handleChange(e)}
                      />
                      <Tooltip
                          title="Click to upload picture"
                          placement="right-start"
                      >
                        <label htmlFor="singleUpload" className="label">
                          <FaImage className={classes.uploadIcon} size="20%" />
                        </label>
                      </Tooltip>
                    </div>
                )}
              </div>
            </DialogContent>

            <DialogActions>
              <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.uploadImageAndCreatePost(
                        this.state.description,
                        this.state.image.raw,
                        this.props.userInfo.email,
                        this.props.userInfo.firstName,
                        this.props.userInfo.fullName,
                        this.props.userInfo.googleDefaultPic,
                        this.props.userInfo.userUploadedPic
                    );
                    this.props.isClose();
                  }}
              >
                SUBMIT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImageAndCreatePost: (
        description,
        image,
        email,
        userFirstName,
        userFullName,
        googleDefaultPic,
        userUploadedPic
    ) =>
        dispatch(
            uploadImageAndCreatePost(
                description,
                image,
                email,
                userFirstName,
                userFullName,
                googleDefaultPic,
                userUploadedPic
            )
        ),
    getAllFoodPicPost: () => dispatch(getAllFoodPicPost()),
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
)(FoodPicturesCreatePost);
