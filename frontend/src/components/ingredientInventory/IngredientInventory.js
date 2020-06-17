import React from 'react';
import { connect } from 'react-redux';
import { addingIngredient } from '../../actions/ingredientInventoryActions';
import { clearIngredients,deleteIngredient } from '../../actions/ingredientInventoryActions';
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from "../login/Header";





class IngredientInventory extends React.Component {


    addItem() {
        let inventory =  document.getElementById("inventory").value
        let amount =  document.getElementById("amount").value

        let key = 0 
        if (this.props.ingredientInventory.length>0){
          key = this.props.ingredientInventory[this.props.ingredientInventory.length - 1].key +1
        }

        this.props.addingIngredient({
            "key": key,
            "description": inventory,
            "amount":amount
        })

    }


	render() {


        const useStyles = makeStyles((theme) => ({
            root: {
                backgroundColor: "#FF0000",
                color: "black",
                position: "sticky",

        }}));

        

		return (				
        
        <div>
        <Header/>
        <Container  text-align="center"   >
        &nbsp;
        <Typography variant="h4">
            Ingredient Inventory
            </Typography>
            
            <p>	
				<TextField label="Ingredient" variant="filled" type="text" id="inventory" name="fname" size="100" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField label="Amount" variant="filled" type="text" id="amount" name="fname" size="100" />
			</p>


            <p>
            <Button variant="contained" color="secondary" disableElevation onClick={() => { this.addItem()}}>add ingredient</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="secondary"  onClick={() =>  this.props.clearIngredients([]) }>clear inventory</Button>
            </p>


        <TableContainer component={Paper}>
        <Table className={useStyles.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Ingredient</TableCell>
                <TableCell align="right">Amount&nbsp;(kg/quantity)</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.props.ingredientInventory.map((row) => (
                <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                <Button variant="contained" color="secondary" onClick={() => this.props.deleteIngredient(row.key)}>Delete</Button>
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
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
const mapStateToProps = (state) => { //name is by convention
    return { ingredientInventory: state.ingredientInventory}; //now it will appear as props
}
    

export default connect(mapStateToProps, { addingIngredient,clearIngredients,deleteIngredient })(IngredientInventory);
