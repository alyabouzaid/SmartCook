import React from "react";
import Header from "../login/Header";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { getMyFoodPicPost } from "../../actions/foodPicturesActions";
import { css } from "@emotion/core";
import FoodPicturesPost from "./foodPicturesPost";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import Pagination from "@material-ui/lab/Pagination";

const useStyles = (theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
});

class FoodPicturesMyPost extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMyFoodPicPost();
    // this.props.getAllFoodPicPost();
  }

  render() {
    const { classes } = this.props;

    const items = [1, 2, 3, 4, 5, 6];

    //     return (
    //       //   <img src={pic}></img>
    //       <div>
    //         <Header />
    //         <div className={classes.root}>
    //           {items.map((post) => (
    //             //   <FoodPicturesPost key={post._id} item={post} cardWidth={300} />
    //             //   <img src={post} style={{ width: 300, height: 500 }} />
    //             <div>{post}</div>
    //           ))}
    //         </div>
    //       </div>
    //     );
    //   }
    // }

    //     return (
    //       <div className={classes.root}>
    //         <div>row1</div>
    //         <div>row2</div>
    //         <div>row3</div>
    //       </div>
    //     );
    //   }
    // }

    return (
      <div>
        <Header />

        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                {/* <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"} */}
                Picture
              </div>

              <div>
                <h4>{this.props.userInfo.fullName}</h4>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6>{this.props.myPost.length} posts</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.root}>
          {this.props.myPost.map((post) => (
            <FoodPicturesPost
              key={post._id}
              item={post}
              cardWidth={300}
              cardLeftMargin={30}
              cardRightMargin={30}
            />
          ))}
        </div>
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
      //   </div>
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
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(FoodPicturesMyPost);
