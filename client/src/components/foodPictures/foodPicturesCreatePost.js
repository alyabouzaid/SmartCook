import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "../../index.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../login/Header";
import { TextField } from "@material-ui/core";
import { FaImage } from "react-icons/all";
import {
  uploadImageAndCreatePost,
  getAllFoodPicPost,
} from "../../actions/foodPicturesActions";
import compose from "recompose/compose";
import pic from "../login/landingPage.jpg";

const useStyles = (theme) => ({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 200,
  },
  rootCard: {
    width: 500,
  },
  rootCardTitle: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
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

    this.handleChange = this.handleChange.bind(this);
    this.inputRef = null;
  }

  handleChange(e) {
    if (e.target.files.length) {
      this.setState({
        image: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div
          style={{ backgroundColor: "#FDF5E6", height: 1000, backgroundSize: "cover"}}
      >
        <Header />
        <div className={classes.rootContainer}>
          <Card className={classes.rootCard}>
            <Typography
              className={classes.rootCardTitle}
              variant="h5"
              component="p"
              style={{ fontFamily: "Grand Hotel" }}
            >
              Food Picture Post
            </Typography>
            <form className={classes.description}>
              <TextField
                multiline
                type="text"
                placeholder="Enter post description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </form>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => this.inputRef.click()}
            >
              Upload Pic
            </Button>
            <input
              type="file"
              ref={(inputRef) => {
                this.inputRef = inputRef;
              }}
              id="upload-button"
              style={{ display: "none" }}
              onChange={(e) => this.handleChange(e)}
            />

            <div className={classes.image}>
              {this.state.image.preview ? (
                <img
                  src={this.state.image.preview}
                  alt="dummy"
                  width="300"
                  height="300"
                />
              ) : (
                <>
                  <FaImage size="15%" />
                  <h5 className="text-center">Image preview</h5>
                </>
              )}
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.uploadImageAndCreatePost(
                  this.state.description,
                  this.state.image.raw,
                  this.props.userInfo.email,
                  this.props.userInfo.firstName,
                  this.props.userInfo.fullName
                )
              }
            >
              SUBMIT POST
            </Button>
          </Card>
        </div>
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
      userFullName
    ) =>
      dispatch(
        uploadImageAndCreatePost(
          description,
          image,
          email,
          userFirstName,
          userFullName
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
