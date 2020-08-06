import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FoodPicturesPost from "./foodPicturesPost";
import FoodPicturesCreatePost from "./foodPicturesCreatePost";
import FoodPicturesAnnouncement from "./foodPicturesAnnouncement";
import FoodPicturesPostFilters from "./foodPicturesPostFilters";
import Footer from "../footer/footer";
import { getAllFoodPicPost } from "../../actions/foodPicturesActions";
import { css } from "@emotion/core";
import Box from "@material-ui/core/Box";
import CircleLoader from "react-spinners/CircleLoader";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = (theme) => ({
  pagination: {
    display: "inline-block",
    textAlign: "center",
    marginBottom: 50,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

const override = css`
  display: block;
  margin: 2 auto;
`;

class FoodPicturesAllPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      currentPage: 1,
      perPage: 5,
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.getAllFoodPicPost();
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
    const data = this.props.allPost;
    const sliceData = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    return sliceData.map((post) => {
      return (
        <FoodPicturesPost
          key={post._id}
          item={post}
          cardWidth={700}
          cardCaptionSize={20}
          style={{ display: "inline-block", textAlign: "center" }}
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
            loading={this.props.allPostLoading}
          />
        </div>

        <p
          style={{
            textAlign: "left",
            backgroundColor: "transparent",
            margin: "3",
            fontSize: "24px",
          }}
        />
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <Box>
            <FoodPicturesPostFilters />
          </Box>
          <Box>
            <label
              htmlFor="icon-button-file"
              style={{ justifyContent: "right" }}
            >
              <Tooltip title="Click to create new post" arrow>
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  color="black"
                  onClick={this.handleClickOpenCreatePost}
                  style={{ position: "fixed", right: "5%" }}
                >
                  <AddIcon size="large" style={{ width: 60, height: 60 }} />
                </IconButton>
              </Tooltip>
            </label>
          </Box>
        </Box>

        <p
          style={{
            textAlign: "left",
            backgroundColor: "transparent",
            margin: "3",
            fontSize: "24px",
          }}
        />

        {this.state.isOpen ? (
          <FoodPicturesCreatePost
            isOpen={this.state.isOpen}
            isClose={this.handleClickCloseCreatePost}
          />
        ) : null}

        {this.displayData()}

        <FoodPicturesAnnouncement />

        <div className={classes.pagination}>
          <SPagination
            page={this.state.currentPage}
            sizePerPage={this.state.perPage}
            totalSize={this.props.allPost.length}
            pagesNextToActivePage={5}
            sizePerPageOptions={[5, 10, 15, 20]}
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
    getAllFoodPicPost: () => dispatch(getAllFoodPicPost()),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
    allPost: state.foodPicturesStore.allPost,
    allPostLoading: state.foodPicturesStore.loadingAllPost,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(FoodPicturesAllPost);
