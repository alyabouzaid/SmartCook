import React from "react";
import Header from "../login/Header";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { getMyFoodPicPost } from "../../actions/foodPicturesActions";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import FoodPicturesPost from "./foodPicturesPost";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css"; // import css

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

  displayData = () => {
    // return <div>{JSON.stringify(this.props.allPostLoading)}</div>;
    const data = this.props.myPost;
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
          cardWidth={300}
          // cardLeftMargin={0}
          // cardRightMargin={0}
        />
      );
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ backgroundColor: "#FDF5E6"}}>
        <Header />

        <div className={classes.loading}>
          <CircleLoader
            css={override}
            size={80}
            color={"green"}
            loading={this.props.myPostLoading}
          />
        </div>

        {/* <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          > */}

        <List style={{ display: "inline-block" }}>
          <div>
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
          </div>
          {/* <Button variant="contained" color="primary">
              CREATE NEW POST
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="primary">
              VIEW ALL POSTS
            </Button> */}
        </List>
        {/* </div>
        </div> */}

        <div className={classes.post}>
          {/* {this.props.myPost.map((post) => (
            <FoodPicturesPost
              key={post._id}
              item={post}
              cardWidth={300}
              // cardLeftMargin={30}
              // cardRightMargin={30}
            />
          ))} */}
          {this.displayData()}
        </div>

        <div className={classes.pagination}>
          <SPagination
            page={this.state.currentPage}
            sizePerPage={this.state.perPage}
            totalSize={this.props.myPost.length}
            pagesNextToActivePage={5}
            sizePerPageOptions={[8, 12, 16]}
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