import React from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { uploadProfilePicImage } from "../../actions/userProfilePicActions";
import Toggle from "./Toggle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

const useStyles = (theme) => ({
  header: {
    marginTop: 10,
    fontSize: 22,
  },
  root: {
    marginTop: 20,
    marginLeft: 25,
    textAlign: "left",
    justifyContent: "left",
  },
  subheader1: {
    fontSize: 16,
    marginRight: 15,
  },
  subheader2: {
    fontSize: 16,
    marginRight: 5,
  },
  item: {
    marginRight: 20,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    width: 270,
  },
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {
        preview: "",
        raw: "",
      },
    };
  }

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
              maxWidth={"md"}
              fullWidth={true}
          >
            <DialogTitle
                className={classes.header}
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
            >
              Settings
            </DialogTitle>
            <DialogContent>
              <Divider />
            </DialogContent>

            <DialogContent>
              <div className={classes.item}>
                <Typography className={classes.subheader1} variant="h7">
                  Profile Picture
                </Typography>
                <div className={classes.image}>
                  {this.state.image.preview ? (
                      <img
                          src={this.state.image.preview}
                          alt="dummy"
                          width="150"
                          height="150"
                      />
                  ) : (
                      <div>
                        <input
                            type="file"
                            id="singleUpload"
                            className="inputfile"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label htmlFor="singleUpload">
                          <AccountCircleRoundedIcon
                              style={{
                                fontSize: 30,
                              }}
                          />
                        </label>
                      </div>
                  )}
                </div>
              </div>
            </DialogContent>

            <DialogContent>
              <div className={classes.item}>
                <Typography className={classes.subheader2} variant="h7">
                  Dark/ Light Mode
                </Typography>
                <Toggle />
              </div>
            </DialogContent>

            <DialogActions>
              <Button color="primary" onClick={this.handleClick}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadProfilePicImage: (image, email) =>
        dispatch(uploadProfilePicImage(image, email)),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
  };
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(Settings);
