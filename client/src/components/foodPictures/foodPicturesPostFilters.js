import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  getAllFoodPicPost,
  getAllFoodPicPost_OldToNew,
  getAllFoodPicPost_MostLiked,
} from "../../actions/foodPicturesActions";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({});

class FoodPicturesPostFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="outlined"
          style={{ fontSize: 14, color: "#4db6ac" }}
        >
          Filter
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              this.handleClose();
              this.props.getAllFoodPicPost_OldToNew();
            }}
          >
            <Typography variant="subtitle2">Oldest to Newest</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              this.props.getAllFoodPicPost();
            }}
          >
            <Typography variant="subtitle2">Newest to Oldest</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              this.props.getAllFoodPicPost_MostLiked();
            }}
          >
            <Typography variant="subtitle2">Most liked</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFoodPicPost: () => dispatch(getAllFoodPicPost()),
    getAllFoodPicPost_OldToNew: () => dispatch(getAllFoodPicPost_OldToNew()),
    getAllFoodPicPost_MostLiked: () => dispatch(getAllFoodPicPost_MostLiked()),
  };
};

const mapStateToProps = (state) => {
  return {
    myPost: state.foodPicturesStore.myPost,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(FoodPicturesPostFilters);
