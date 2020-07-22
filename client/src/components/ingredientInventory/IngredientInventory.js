import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getInventory } from "../../actions/inventoryListActions-modified";

class IngredientInventory extends React.Component {
  componentDidMount() {
    this.props.getInventory();
  }

  //   render() {
  //     return this.props.inventory.map((item) => (
  //       <div>{JSON.stringify(item)}</div>
  //     ));
  //   }
  // }

  // addItem() {
  //   let inventory = document.getElementById("inventory").value;
  //   let amount = document.getElementById("amount").value;
  //   let targetAmount = document.getElementById("targetAmount").value;

  //   let key = 0;
  //   if (this.props.ingredientInventory.length > 0) {
  //     key =
  //       this.props.ingredientInventory[
  //         this.props.ingredientInventory.length - 1
  //       ].key + 1;
  //   }

  //   this.props.addingIngredient({
  //     email: this.props.userInfo.email,
  //     inventory: [
  //       {
  //         key: key,
  //         description: inventory,
  //         amount: amount,
  //         targetAmount: targetAmount,
  //         selected: false,
  //       },
  //     ],
  //   });
  // }

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        backgroundColor: "#FF0000",
        color: "black",
        position: "sticky",
      },
    }));

    // return this.props.ingredientInventory.map((item) => (
    //   <div>{JSON.stringify(item)}</div>
    // ));

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
                    Target Amount&nbsp;(kg/quantity)
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.ingredientInventory.map((item) =>
                  item.inventory.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell style={{ fontSize: "16px" }} align="right">
                        {row.description}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }} align="right">
                        {row.amount}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }} align="right">
                        {row.targetAmount}
                      </TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          &nbsp;
        </Container>
      </div>
    );
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
