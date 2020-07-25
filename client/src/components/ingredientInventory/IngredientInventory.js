import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";

import { addingIngredient } from "../../actions/ingredientInventoryActions";
import {
  clearIngredients,
  deleteIngredient,
  initialData,
} from "../../actions/ingredientInventoryActions";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IngredientInventoryTable from "./ingredientInventoryTable";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const filterOptions = [
  "Dairy",
  "Fruits",
  "Grains",
  "Meat",
  "Seafood",
  "Vegetables",
];

let currentCategory = [];

const useStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttons: {
    marginTop: 10,
    marginBottom: 25,
  },
});

class IngredientInventory extends React.Component {
  componentDidMount() {
    this.props.initialData();
  }

  addItem() {
    let inventory = document.getElementById("inventory").value;
    let amount = document.getElementById("amount").value;
    // let targetAmount =  document.getElementById("targetAmount").value
    let category = document.getElementById("category").value;

    let key = 0;
    if (this.props.ingredientInventory.length > 0) {
      key =
        this.props.ingredientInventory[
          this.props.ingredientInventory.length - 1
        ].key + 1;
    }

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

  handleDelete = (rowIndex) => {
    console.log("checkIndex ", rowIndex);
    // console.log("check user ", this.props.userInfo.email);
    // console.log("check list ", this.props.ingredientInventory);

    this.props.deleteIngredient(
      {
        email: this.props.userInfo.email,
        key: rowIndex,
      },
      this.props.ingredientInventory
    );
  };

  // TODO: temporary mock filters, replace with redux

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container text-align="center">
          <div className={classes.root}>
            <TextField
              label="Ingredient"
              // variant="filled"
              type="text"
              id="inventory"
              style={{ width: 100 }}
              //   name="fname"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              label="Amount"
              // variant="filled"
              type="text"
              id="amount"
              style={{ width: 100 }}
              //   name="fname"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Autocomplete
              id="category"
              style={{ width: "17%" }}
              //   size="medium"
              options={filterOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
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
              CLEAR ALL
            </Button>
          </div>
          <IngredientInventoryTable
            inventory={this.props.ingredientInventory}
            onDelete={this.handleDelete}
          />
          {/* <TableContainer component={Paper}>
            <Table className={useStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                    align="right"
                  >
                    Ingredient
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                    align="right"
                  >
                    Amount&nbsp;(kg/quantity)
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                    align="right"
                  >
                    Category &nbsp;
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.props.ingredientInventory.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell style={{ fontSize: "16px" }} align="right">
                      {item.description}
                    </TableCell>
                    <TableCell style={{ fontSize: "16px" }} align="right">
                      {item.amount}
                    </TableCell>
                    <TableCell style={{ fontSize: "16px" }} align="right">
                      {item.category}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          onClick={() =>
                            this.props.deleteIngredient(
                              {
                                email: this.props.userInfo.email,
                                key: item.key,
                              },
                              this.props.ingredientInventory
                            )
                          }
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          &nbsp;
        </Container>
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
