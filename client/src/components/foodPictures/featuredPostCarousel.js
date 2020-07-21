import React from "react";
import Carousel from "react-material-ui-carousel";
import compose from "recompose/compose";
import MainCard from "../landingPage/MainCard";
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

  props.featuredPost &&
    props.featuredPost.map((item) => numLikes.push(item.likesLength));

  posts.push(
    <MainCard card={props.card} isAuthenticated={props.isAuthenticated} />
  );

  {
    props.featuredPost &&
      props.featuredPost.map((item) =>
        item.image.map((image) =>
          posts.push(
            <img className={classes.featuredPosts} src={image.secure_url} />
          )
        )
      );
  }

  return (
    <Carousel>
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

export default compose()(FeaturePostCarousel);