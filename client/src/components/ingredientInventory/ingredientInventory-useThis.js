import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getInventory } from "../../actions/inventoryListActions-modified";

class IngredientInventory extends React.Component {
  componentDidMount() {
    this.props.getInventory();
  }

  render() {
    return this.props.inventory.map((item) => (
      <div>{JSON.stringify(item)}</div>
    ));
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInventory: () => dispatch(getInventory()),
  };
};

//state has entire state of app!!
const mapStateToProps = (state) => {
  //name is by convention
  return {
    inventory: state.inventoryModified.inventory,
    userInfo: state.userStore,
  }; //now it will appear as props
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  IngredientInventory
);
