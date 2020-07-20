import React from "react";
import Header from "../login/Header";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { getAllFoodPicPost } from "../../actions/foodPicturesActions";
import { css } from "@emotion/core";
import FoodPicturesPost from "./foodPicturesPost";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = (theme) => ({
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
});

const override = css`
  display: inline-block;
  margin: 0;
  justifycontent: center;
  alignitems: center;
`;

class FoodPicturesAllPost extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllFoodPicPost();
  }

  render() {
    const { classes } = this.props;

    //     return (
    //       <div>
    //         <Header />
    //         {this.props.foodPicPost &&
    //           this.props.foodPicPost.allPost &&
    //           this.props.foodPicPost.allPost.map((item) => (
    //             <div>{item.description}</div>
    //           ))}
    //       </div>
    //     );
    //   }
    // }

    return (
      <div style={{ backgroundColor: "#FFFAF0" }}>
        <Header />

        {this.props.allPost.map((post) => (
          <FoodPicturesPost
            key={post._id}
            item={post}
            cardWidth={700}
            cardLeftMargin={450}
            cardRightMargin={0}
          />
        ))}
        <div className={classes.pagination}>
          <Pagination
            count={10}
            size="large"
            color="primary"
            shape="rounded"
            style={{
              display: "inline-block",
              textAlign: "center",
              marginBottom: 30,
            }}
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
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(FoodPicturesAllPost);
