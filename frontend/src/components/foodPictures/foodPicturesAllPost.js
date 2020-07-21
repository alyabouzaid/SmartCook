import React from "react";
import Header from "../login/Header";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { getAllFoodPicPost } from "../../actions/foodPicturesActions";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import FoodPicturesPost from "./foodPicturesPost";
// import Pagination from "@material-ui/lab/Pagination";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css"; // import css

const useStyles = (theme) => ({
  pagination: {
    display: "inline-block",
    textAlign: "center",
    marginBottom: 50,
    // "& > *": {
    //   marginTop: theme.spacing(2),
    // },
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

  displayData = () => {
    // return <div>{JSON.stringify(this.props.allPostLoading)}</div>;
    const data = this.props.allPost;
    const sliceData = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    // return <div>{JSON.stringify(sliceData[0])}</div>;
    return sliceData.map((post) => {
      return (
        <FoodPicturesPost
          key={post._id}
          item={post}
          cardWidth={700}
          // cardLeftMargin={0}
          // cardRightMargin={0}
          style={{ display: "inline-block", textAlign: "center" }}
        />
      );
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ backgroundColor: "#FDF5E6" }}>
        <Header />

        <div className={classes.loading}>
          <CircleLoader
            css={override}
            size={80}
            color={"green"}
            loading={this.props.allPostLoading}
          />
        </div>

        {this.displayData()}

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
