import React from "react";
import Carousel from "react-material-ui-carousel";
import compose from "recompose/compose";
import MainCard from "../landingPage/MainCard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  featuredPosts: {
    backgroundSize: "cover",
    width: 500,
    height: 350,
  },
  featuredPostsCaption: {
    color: "#4db6ac",
    fontFamily: "Grand Hotel",
    fontSize: 22,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    square: false,
    elevation: 3,
  },
}));

const displayData = (post) => {
  return (
    <div>
      <img
        className={classes.featuredPosts}
        src={post.image[0].secure_url}
        aria-label="add to favorites"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      {/* <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        elevation="8"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography style={{ textAlign: "left", fontSize: 12 }}>
          <li style={{ listStyle: "none" }}>
            Posted by: {post.postedByFullName}
          </li>
          <li style={{ listStyle: "none" }}>
            Date: {new Date(post.dateTime.toDateString())}
          </li>
        </Typography>
      </Popover> */}

      <Typography className={classes.featuredPostsCaption} variant="subtitle1">
        Recent top 3 voted picture with <b>{post.likesLength}</b> likes
      </Typography>
    </div>
  );
};

// {
//   props.featuredPost &&
//     props.featuredPost.map((item) =>
//       item.image.map((image) =>
//         posts.push(
//           <img className={classes.featuredPosts} src={image.secure_url} />
//         )
//       )
//     );
// }

function FeaturePostCarousel(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const posts = [];

  {
    props.featuredPost && props.featuredPost.map((item) => posts.push(item));
  }

  return (
    <Carousel>
      <div>
        <MainCard card={props.card} isAuthenticated={props.isAuthenticated} />
      </div>

      {/* {posts.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))} */}

      {/* {
        posts.map((post) => displayData(post))

        <div>
          <img
            className={classes.featuredPosts}
            src={post.image[0].secure_url}
          />

          <Typography
            className={classes.featuredPostsCaption}
            variant="subtitle1"
          >
            Recent top 3 voted picture with <b>{post.likesLength}</b> likes
          </Typography>
        </div>
      } */}

      <div>{displayData(posts[0])}</div>

      <div>{displayData(posts[1])}</div>

      <div>{displayData(posts[2])}</div>
    </Carousel>
  );
}

export default compose()(FeaturePostCarousel);
