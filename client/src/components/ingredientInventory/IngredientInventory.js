import React from 'react';
import { connect } from 'react-redux';

import { addingIngredient } from '../../actions/ingredientInventoryActions';
import { clearIngredients,deleteIngredient,initialData } from '../../actions/ingredientInventoryActions';
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import Autocomplete from '@material-ui/lab/Autocomplete';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const filterOptions = [
  "Dairy", "Fruits", "Grains", "Meat", "Seafood", "Vegetables"
];

let currentCategory = []
class IngredientInventory extends React.Component {

    componentDidMount(){
        this.props.initialData()
    }

    addItem() {
        let inventory =  document.getElementById("inventory").value
        let amount =  document.getElementById("amount").value
        // let targetAmount =  document.getElementById("targetAmount").value
        let category =  document.getElementById("category").value

        let key = 0
        if (this.props.ingredientInventory.length>0){
            key = this.props.ingredientInventory[this.props.ingredientInventory.length - 1].key +1
        }

        this.props.addingIngredient({
            "email" : this.props.userInfo.email,
            "inventory":[{
            "key": key,
            "description": inventory,
            "amount": amount,
            "category":category,
            "targetAmount": 0,
            "selected": false}]
        })

    }




        // TODO: temporary mock filters, replace with redux


    render() {


        const useStyles = makeStyles((theme) => ({
            root: {
                backgroundColor: "#FF0000",
                color: "black",
                position: "sticky",


            },
        }));



        return (

          <div>
  
          <Container text-align="center">
            &nbsp;
            <p>
              <TextField
                label="Ingredient"
                // variant="filled"
                type="text"
                id="inventory"
                name="fname"
                size="100"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                label="Amount"
                // variant="filled"
                type="text"
                id="amount"
                name="fname"
                size="100"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <TextField
                label="Target Amount"
                variant="filled"
                type="text"
                id="targetAmount"
                name="fname"
                size="100"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                <ListItem>
                    <Autocomplete
                        id="category"
                        style={{width: "100%"}}
                        options={filterOptions}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                    />
                </ListItem>
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
                    Category &nbsp;
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>



                  {this.props.ingredientInventory.map(item => (
                  
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
                                      this.props.deleteIngredient({
                                          email: this.props.userInfo.email,
                                          key: item.key,
                                      },this.props.ingredientInventory)
                                  }
                              />
                          </IconButton>
                        {/*<Button*/}
                        {/*  variant="contained"*/}
                        {/*  color="primary"*/}
                        {/*  onClick={() =>*/}
                        {/*    this.props.deleteIngredient({*/}
                        {/*      email: this.props.userInfo.email,*/}
                        {/*      key: item.key,*/}
                        {/*    },this.props.ingredientInventory)*/}
                        {/*  }*/}
                        {/*>*/}
                        {/*  Delete*/}
                        {/*</Button>*/}
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


const mapDispatchToProps = (dispatch) => {
  return {
    initialData: () => dispatch(initialData()),
    addingIngredient:(emailAndIngredientObject) =>dispatch(addingIngredient(emailAndIngredientObject)),
    clearIngredients:(email) =>dispatch(clearIngredients(email)),
    deleteIngredient:(emailAndKeyObject,ingredientInventory) =>dispatch(deleteIngredient(emailAndKeyObject,ingredientInventory))
  };
};


//state has entire state of app!!
const mapStateToProps = (state) => { //name is by convention
    return { ingredientInventory: state.ingredientInventory,
            userInfo: state.userStore}; //now it will appear as props
}


export default  connect(mapStateToProps, mapDispatchToProps)(IngredientInventory);



