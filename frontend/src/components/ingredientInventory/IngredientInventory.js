import React from "react";
import { connect } from "react-redux";
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
import { loadUserData } from "../../actions/userActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Header from "../login/Header";
import pic from "./image5.jpg";

class IngredientInventory extends React.Component {
  componentDidMount() {
    this.props.initialData();
  }

  addItem() {
    let inventory = document.getElementById("inventory").value;
    let amount = document.getElementById("amount").value;
    let targetAmount = document.getElementById("targetAmount").value;

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
          targetAmount: targetAmount,
          selected: false,
        },
      ],
    });
  }

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        backgroundColor: "#FF0000",
        color: "black",
        position: "sticky",
      },
    }));

    return (
      <div
        style={{
          backgroundImage: `url(${pic})`,
          height: 1000,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <Container text-align="center">
          &nbsp;
          <p>
            <TextField
              style={{ background: "rgba(255, 255, 255, 0.6)" }}
              label="Ingredient"
              variant="filled"
              type="text"
              id="inventory"
              name="fname"
              size="100"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              style={{ background: "rgba(255, 255, 255, 0.6)" }}
              label="Amount"
              variant="filled"
              type="text"
              id="amount"
              name="fname"
              size="100"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              style={{ background: "rgba(255, 255, 255, 0.6)" }}
              label="Target Amount"
              variant="filled"
              type="text"
              id="targetAmount"
              name="fname"
              size="100"
            />
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                this.addItem();
              }}
            >
              add ingredient
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.clearIngredients(this.props.userInfo.email)
              }
            >
              clear inventory
            </Button>
          </p>
          <TableContainer
            style={{ background: "rgba(255, 255, 255, 0.6)" }}
            component={Paper}
          >
            <Table className={useStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold', fontSize: '16px'}} align="right">Ingredient</TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: '16px'}} align="right">Amount&nbsp;(kg/quantity)</TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: '16px'}} align="right">
                    Target Amount&nbsp;(kg/quantity)
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.ingredientInventory.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{fontSize: '16px'}} align="right">{row.description}</TableCell>
                    <TableCell style={{fontSize: '16px'}} align="right">{row.amount}</TableCell>
                    <TableCell style={{fontSize: '16px'}} align="right">{row.targetAmount}</TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.props.deleteIngredient({
                            email: this.props.userInfo.email,
                            key: row.key,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          &nbsp;
        </Container>
      </div>
    );
  }
}

//state has entire state of app!!
const mapStateToProps = (state) => {
  //name is by convention
  return {
    ingredientInventory: state.ingredientInventory,
    userInfo: state.userStore,
  }; //now it will appear as props
};

export default connect(mapStateToProps, {
  addingIngredient,
  clearIngredients,
  deleteIngredient,
  initialData,
  loadUserData,
})(IngredientInventory);
