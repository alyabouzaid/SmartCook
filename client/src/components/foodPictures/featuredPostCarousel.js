import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import MainCard from "../landingPage/MainCard";
import Carousel from "react-material-ui-carousel";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

const useStyles = (theme) => ({
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
});

const posts = [];

class FeaturedPostCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handlePopoverOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  displayData = (item) => {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
        <div>
          <Link
              to={"/foodPicAllPost"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
          >
            <img
                className={classes.featuredPosts}
                src={item && item.image[0].secure_url}
                aria-label="add to favorites"
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={this.handlePopoverOpen}
                onMouseLeave={this.handlePopoverClose}
            />
          </Link>
          <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              elevation="8"
              open={open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              onClose={this.handlePopoverClose}
              disableRestoreFocus
          >
            <Typography style={{ textAlign: "left", fontSize: 12 }}>
              <li style={{ listStyle: "none" }}>
                Posted by: {item && item.postedByFullName}
              </li>
              <li style={{ listStyle: "none" }}>Date: {item && item.dateTime}</li>
            </Typography>
          </Popover>

          <Typography
              className={classes.featuredPostsCaption}
              variant="subtitle1"
          >
            Recent&nbsp; top 3 voted picture with{" "}
            <b>{item && item.likesLength}</b> likes
          </Typography>
        </div>
    );
  };

  render() {
    return (
        <Carousel>
          <div>
            <MainCard
                card={this.props.card}
                isAuthenticated={this.props.isAuthenticated}
            />
          </div>

          {this.displayData(this.props.featuredPost[0])}
          {this.displayData(this.props.featuredPost[1])}
          {this.displayData(this.props.featuredPost[2])}
        </Carousel>
    );
  }
}

export default compose(withStyles(useStyles))(FeaturedPostCarousel);
