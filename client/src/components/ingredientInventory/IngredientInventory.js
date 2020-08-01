import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";

import {
  clearIngredients,
  deleteIngredient,
  initialData,
  addingIngredient,
  editingIngredient,
} from "../../actions/ingredientInventoryActions";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IngredientInventoryTable from "./ingredientInventoryTable";
import Footer from "../footer/footer";

let filterOptionsMain = [
  "Dairy",
  "Fruits",
  "Grains",
  "Meat",
  "Seafood",
  "Vegetables",
];

let filterOptions = [];

let amount = 0;
let inventory = "";
let category = "";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  buttons: {
    marginTop: 10,
    marginBottom: 25,
  },
  inventoryTable: {
    marginTop: 30,
  },
});

class IngredientInventory extends React.Component {
  componentDidMount() {
    this.props.initialData();
  }

  addItem() {
    let key = 0;
    if (this.props.ingredientInventory.length > 0) {
      key =
        this.props.ingredientInventory[
          this.props.ingredientInventory.length - 1
        ].key + 1;
    }

    let allIngredientsArray = this.props.ingredientInventory.map(
      (item) => item.description
    );

    if (!(inventory === "" || allIngredientsArray.includes(inventory))) {
      this.props.addingIngredient({
        email: this.props.userInfo.email,
        inventory: [
          {
            key: key,
            description: inventory,
            amount: amount,
            category: category,
            targetAmount: 0,
            selected: false,
          },
        ],
      });
    }
  }

  setFilterCategories() {
    filterOptions = filterOptionsMain.concat(
      this.props.ingredientInventory
        .map((item) => item.category)
        .filter((item) => {
          if (filterOptionsMain.includes(item)) {
            return false;
          } else {
            return true;
          }
        })
    );

    let tempArray = [];
    filterOptions = filterOptions.filter((item) => {
      if (tempArray.includes(item)) {
        return false;
      } else {
        tempArray.push(item);
        return true;
      }
    });
  }

  handleDelete = (rowIndex) => {
    this.props.deleteIngredient(
      {
        email: this.props.userInfo.email,
        key: rowIndex,
      },
      this.props.ingredientInventory
    );
  };

  handleEdit = (rowDescription, rowAmount) => {
    this.props.editingIngredient(
      {
        email: this.props.userInfo.email,
        description: rowDescription,
        amount: rowAmount,
      },
      this.props.ingredientInventory
    );
  };

  handleOnChangeIngredient = (event) => {
    inventory = event.target.value;
  };

  handleOnChangeAmount = (event) => {
    amount = event.target.value;
  };

  handleOnChangeCategory = (event) => {
    category = event.target.value;
  };

  updateFilters(newValue) {
    category = newValue;
  }

  // TODO: temporary mock filters, replace with redux

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container text-align="center">
          <div className={classes.root}>
            {this.setFilterCategories()}
            <TextField
              label="Ingredient"
              type="text"
              id="inventory"
              style={{ width: 100 }}
              onChange={this.handleOnChangeIngredient}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              label="Amount"
              type="text"
              id="amount"
              style={{ width: 100 }}
              onChange={this.handleOnChangeAmount}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Autocomplete
              id="category"
              style={{ width: "17%" }}
              options={filterOptions}
              getOptionLabel={(option) => option}
              debug
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  onChange={this.handleOnChangeCategory}
                />
              )}
              onChange={(event, newValue) => {
                this.updateFilters(newValue);
              }}
            />
          </div>

          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                this.addItem();
              }}
            >
              ADD
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.clearIngredients(this.props.userInfo.email)
              }
            >
              CLEAR
            </Button>
          </div>

          <div className={classes.inventoryTable}>
            <IngredientInventoryTable
              inventory={this.props.ingredientInventory}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
          </div>
        </Container>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialData: () => dispatch(initialData()),
    addingIngredient: (emailAndIngredientObject) =>
      dispatch(addingIngredient(emailAndIngredientObject)),
    clearIngredients: (email) => dispatch(clearIngredients(email)),
    deleteIngredient: (emailAndKeyObject, ingredientInventory) =>
      dispatch(deleteIngredient(emailAndKeyObject, ingredientInventory)),
    editingIngredient: (
      emailAndIngredientAndAmountObject,
      ingredientInventory
    ) =>
      dispatch(
        editingIngredient(
          emailAndIngredientAndAmountObject,
          ingredientInventory
        )
      ),
  };
};

//state has entire state of app!!
const mapStateToProps = (state) => {
  //name is by convention
  return {
    ingredientInventory: state.ingredientInventory,
    userInfo: state.userStore,
  }; //now it will appear as props
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(IngredientInventory);
