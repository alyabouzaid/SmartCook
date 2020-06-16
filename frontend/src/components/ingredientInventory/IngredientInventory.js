import React from 'react';
import { connect } from 'react-redux';
import { addingIngredient } from '../../actions/ingredientInventoryActions';
import { clearIngredients } from '../../actions/ingredientInventoryActions';
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

class IngredientInventory extends React.Component {




    addItem() {


        let inventory =  document.getElementById("inventory").value
        let amount =  document.getElementById("amount").value

        this.props.addingIngredient({
            "key": this.props.ingredientInventory.length,
            "description": inventory,
            "amount":amount
        })

    }

    detailsMessage(i) {
        
        // {console.log(i)}

        var workshops_content = document.getElementById("itemclickedbox");
        workshops_content.value = i
        console.log(workshops_content)
        
    }



	render() {


<<<<<<< HEAD
        const useStyles = makeStyles({
            root: {
                width: 400,
                height: 300,
                position: "relative",
                background: "white",
                marginTop: 200,
                marginRight: "auto",
                marginLeft: "auto",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
                textAlign: "center",
                fontSize: 18,
            },
        });
=======
        const useStyles = makeStyles((theme) => ({
            root: {
                backgroundColor: "#FF0000",
                color: "black",
                position: "sticky",

        }}));
>>>>>>> 0b32df1e6b967853856f443f4b21ad6f02decf55

        

		return (				
        

<<<<<<< HEAD
        <Container  text-align="center" className={useStyles.root} >
=======
        <Container  text-align="center" >
>>>>>>> 0b32df1e6b967853856f443f4b21ad6f02decf55
                        


            <h1>Ingredient Inventory </h1>

            <p>	
                 <b>Ingredient:</b>
				<input type="text" id="inventory" name="fname" size="100" />
			</p>



			<p>	
                 <b>Amount:</b>
				<input type="text" id="amount" name="fname" size="100" />
			</p>



            <p>
            <button onClick={() => { this.addItem()}}>add item</button>
            </p>


            <ul>


                    {(this.props.ingredientInventory).map(item => ( 
                    <div>

                    {/* <button onClick={() => { this.detailsMessage( "   " +item.description+  "  item number:  "+ item.key)}}>Show date</button> */}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {item.description} 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {item.amount  }
                    </div>
                    ))}
            </ul>

            {/* <input  id="itemclickedbox" value="No item clicked yet" size="100"/> */}

			<p>	
				<button onClick={() =>  this.props.clearIngredients([]) }>clear inventory</button>
			</p>



        </Container>);
	}
}

//state has entire state of app!!
const mapStateToProps = (state) => { //name is by convention
    return { ingredientInventory: state.ingredientInventory}; //now it will appear as props
}
    

export default connect(mapStateToProps, { addingIngredient,clearIngredients })(IngredientInventory);
