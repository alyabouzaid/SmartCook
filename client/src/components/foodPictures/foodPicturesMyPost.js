import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { getMyFoodPicPost } from "../../actions/foodPicturesActions";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import FoodPicturesPost from "./foodPicturesPost";
import FoodPicturesCreatePost from "./foodPicturesCreatePost";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css"; // import css
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Footer from "../footer/footer";

const useStyles = (theme) => ({
  post: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  pagination: {
    display: "inline-block",
    textAlign: "center",
    marginBottom: 50,
  },
});

const override = css`
  display: block;
  margin: 2 auto;
`;

class FoodPicturesMyPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      currentPage: 1,
      perPage: 8,
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.getMyFoodPicPost();
  }

  handleOnPageChange = (currentPage) => {
    const selectedPage = currentPage;
    const offset = (selectedPage - 1) * this.state.perPage;
    this.setState({ currentPage: selectedPage });
    this.setState({ offset: offset });
    this.displayData();
  };

  handleOnSizeChange = (perPage) => {
    this.setState({ perPage, currentPage: 1 });
  };

  handleClickOpenCreatePost = () => {
    this.setState({ isOpen: true });
  };

  handleClickCloseCreatePost = () => {
    this.setState({ isOpen: false });
  };

  displayData = () => {
    const data = this.props.myPost;
    const sliceData = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    return sliceData.map((post) => {
      return <FoodPicturesPost key={post._id} item={post} cardWidth={300} />;
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.loading}>
          <CircleLoader
            css={override}
            size={80}
            color={"green"}
            loading={this.props.myPostLoading}
          />
        </div>

        <Box display="flex" justifyContent="center" m={1} p={1}>
          <Box>
            <Typography
              className={classes.postNum}
              variant="h5"
              component="p"
              style={{
                fontFamily: "Grand Hotel",
                marginTop: 25,
                marginBottom: 20,
              }}
            >
              Total {this.props.myPost.length} posts
            </Typography>
          </Box>

          <Box>
            {/* <Link
              to={"/foodPicNewPost"}
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
            <label htmlFor="icon-button-file">
              <Tooltip title="Click to create new post" placement="right" arrow>
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  color="black"
                  onClick={this.handleClickOpenCreatePost}
                >
                  <AddIcon size="medium" style={{ width: 60, height: 50 }} />
                </IconButton>
              </Tooltip>
            </label>
            {/* </Link> */}
          </Box>
        </Box>

        {this.state.isOpen ? (
          <FoodPicturesCreatePost
            isOpen={this.state.isOpen}
            isClose={this.handleClickCloseCreatePost}
          />
        ) : null}

        <div className={classes.post}>{this.displayData()}</div>

        <div className={classes.pagination}>
          <SPagination
            page={this.state.currentPage}
            sizePerPage={this.state.perPage}
            totalSize={this.props.myPost.length}
            pagesNextToActivePage={5}
            sizePerPageOptions={[8, 12, 16, 20]}
            onPageChange={this.handleOnPageChange}
            onSizeChange={this.handleOnSizeChange}
          />
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyFoodPicPost: () => dispatch(getMyFoodPicPost()),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
    myPost: state.foodPicturesStore.myPost,
    myPostLoading: state.foodPicturesStore.loadingMyPost,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(FoodPicturesMyPost);
