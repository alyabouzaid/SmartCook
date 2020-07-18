import React from "react";
import Carousel from "react-material-ui-carousel";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import MainCard from "../landingPage/MainCard";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  featuredPosts: {
    backgroundSize: "cover",
    width: 500,
    height: 350,
  },
  featuredPostsLegend: {
    colour: "#4db6ac",
  },
}));

function FeaturePostCarousel(props) {
  const classes = useStyles();

  const posts = [];
  const numLikes = [];

  props.featuredPosts &&
    props.featuredPosts.map((item) => numLikes.push(item.likesLength));

  posts.push(
    <MainCard card={props.card} isAuthenticated={props.isAuthenticated} />
  );

  {
    props.featuredPosts &&
      props.featuredPosts.map((item) =>
        item.image.map((image) =>
          posts.push(
            <img className={classes.featuredPosts} src={image.secure_url} />
          )
        )
      );
  }

  //   var items = [
  //     {
  //       name: "Random Name #1",
  //       description: "Probably the most random thing you have ever seen!",
  //     },
  //     // {
  //     //   name: "Random Name #2",
  //     //   description: "Hello World!",
  //     // },
  //   ];

  return (
    <Carousel>
      {/* <MainCard card={props.card} isAuthenticated={props.isAuthenticated} /> */}
      {/* {items.map((item) => (
        <Item item={item} />
      ))} */}
      {/* {posts.map((item) => (
        <div>{item}</div>
      ))} */}
      <div>{posts[0]}</div>

      <div>
        {posts[1]}
        <Typography
          className={classes.featuredPostsLegend}
          variant="subtitle1"
          style={{ color: "#1a936f" }}
          // style={{ fontFamily: "Grand Hotel" }}
        >
          Top 3 voted picture with <b>{numLikes[0]}</b> likes
        </Typography>
      </div>

      <div>
        {posts[2]}
        <Typography
          className={classes.featuredPostsLegend}
          variant="subtitle1"
          style={{ color: "#1a936f" }}
          // style={{ fontFamily: "Grand Hotel" }}
        >
          Top 3 voted picture with <b>{numLikes[1]}</b> likes
        </Typography>
      </div>

      <div>
        {posts[3]}
        <Typography
          className={classes.featuredPostsLegend}
          variant="subtitle1"
          style={{ color: "#1a936f" }}
          // style={{ fontFamily: "Grand Hotel" }}
        >
          Top 3 voted picture with <b>{numLikes[2]}</b> likes
        </Typography>
      </div>
    </Carousel>
  );
}

// function Item(props) {
//   return (
//     <Paper style={{ backgroundImage: `url(${pic})` }}>
//       <h2>{props.item.name}</h2>
//       <p>{props.item.description}</p>

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     foodPicPost: state.foodPicturesStore,
//   };
// };

export default compose()(FeaturePostCarousel);
