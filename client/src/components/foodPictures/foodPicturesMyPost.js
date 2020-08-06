import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FoodPicturesPost from "./foodPicturesPost";
import FoodPicturesCreatePost from "./foodPicturesCreatePost";
import FoodPicturesPostFilters from "./foodPicturesPostFilters";
import Footer from "../footer/footer";
import { getMyFoodPicPost } from "../../actions/foodPicturesActions";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import Typography from "@material-ui/core/Typography";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const useStyles = (theme) => ({
  post: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
  },
  postNum: {
    fontFamily: "Grand Hotel",
    marginTop: 25,
    marginBottom: 20,
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
      return (
        <FoodPicturesPost
          key={post._id}
          item={post}
          cardWidth={400}
          cardCaptionSize={17}
        />
      );
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
            <Typography className={classes.postNum} variant="h5" component="p">
              Total {this.props.myPost.length} posts
            </Typography>
          </Box>
          <Box>
            <FoodPicturesPostFilters />
          </Box>

          <Box>
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
        <Footer />
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
