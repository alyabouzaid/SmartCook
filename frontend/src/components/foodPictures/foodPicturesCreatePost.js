import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import pic from "../landingPage/landingPage.jpg";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../login/Header";
import { Input, TextField } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { FaImage } from "react-icons/all";
import { loadUserData } from "../../actions/userActions";
import {
  uploadImageAndCreatePost,
  getAllFoodPicPost,
} from "../../actions/foodPicturesActions";
import compose from "recompose/compose";

const useStyles = (theme) => ({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
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

// const [description, setDescription] = useState("");
//   const [image, setImage] = useState({ preview: "", raw: "" });

//   const hiddenFileInput = React.useRef(null);

//   const handleClick = (event) => {
//     hiddenFileInput.current.click();
//   };

//   // const testing = () => {
//   //   console.log("testing submit button");
//   // };

//   const handleChange = (e) => {
//     if (e.target.files.length) {
//       setImage({
//         preview: URL.createObjectURL(e.target.files[0]),
//         raw: e.target.files[0],
//       });
//     }
//   };

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

    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.hiddenFileInput = this.hiddenFileInput.bind(this);
    this.inputRef = null;
  }

  // handleClick() {
  //   this.hiddenFileInput.current.click();
  // }

  // hiddenFileInput() {
  //   React.useRef(null);
  // }

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

  componentDidMount() {
    this.props.loadUserData();
    this.props.getAllFoodPicPost();
  }
  // render() {
  //   const { classes } = this.props;

  //   return (
  //     <div>
  //       <ul className="message-list">
  //         {this.props.foodPicPost &&
  //           this.props.foodPicPost.foodPicPosts &&
  //           this.props.foodPicPost.foodPicPosts.map((item) => (
  //             <li key={item._id}>
  //               {item.image.map((image) => (
  //                 <img src={image.secure_url} alt="" />
  //               ))}
  //               {/* <img src={item.image.secure_url} alt="" /> */}
  //             </li>
  //           ))}
  //       </ul>
  //     </div>
  //   );
  // }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
        <div className={classes.rootContainer}>
          <Card className={classes.rootCard}>
            <Typography
              className={classes.rootCardTitle}
              variant="h5"
              component="p"
            >
              Food Picture Post
            </Typography>
            <form
              className={classes.description}
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   makeComment(e.target[0].value, item._id);
              // }}
            >
              <TextField
                multiline
                // rows={5}
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
              // onClick={this.handleClick}
              onClick={() => this.inputRef.click()}
            >
              Upload Pic
            </Button>
            <input
              type="file"
              // ref={this.hiddenFileInput}
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
              // href="http://localhost:3000/foodPic"
              onClick={() =>
                this.props.uploadImageAndCreatePost(
                  this.state.description,
                  this.state.image.raw,
                  // props.userInfo.name
                  this.props.userInfo.firstName
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
    uploadImageAndCreatePost: (description, image, username) =>
      dispatch(uploadImageAndCreatePost(description, image, username)),
    loadUserData: () => dispatch(loadUserData()),
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
