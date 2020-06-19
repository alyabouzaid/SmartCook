import React from 'react';
import { connect } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RecipeCard from "./recipeCard";
import Button from "@material-ui/core/Button";
import Header from "../login/Header";
import pic from "../login/landingPage.jpg";
import {selectingIngredient} from "../../actions/selectIngredientActions";
import {newRecommendation, clearRecommendation} from "../../actions/recommendationActions";
import {getRecommendation} from "../../actions/recommendationActions";


class Recommendation extends React.Component {

   render() {

       // const getRecommendation = () => {
       //     fetch("https://api.edamam.com/search?q=chicken%26curry%26onion%26basil&app_id=43011121&app_key" +
       //         "=8ded8a6fbd319218357df399687664aa&from=0&to=10&calories=591-722&health=alcohol-free", {
       //         method: 'GET',
       //     })
       //         .then((res) => res.json())
       //         .then((res) => {
       //             this.props.newRecommendation(res);
       //         })
       // };

       return (
           <div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
               <Header/>
               <div style={{display: 'flex', flexWrap: 'wrap', margin: '3%'}}>
                   <FormControl component="fieldset" style={{margin: '3%'}}>
                       <FormLabel component="legend">Select Your Ingredients</FormLabel>
                       <FormGroup>
                           {this.props.ingredientInventory.map((ingredient) =>
                               <FormControlLabel key={ingredient.id}
                                                 control={<Checkbox checked={ingredient.selected}
                                                                    onChange={() => {this.props.selectingIngredient(ingredient.key);}}
                                                                    name={ingredient.description}/>}
                                                 label={ingredient.description}
                               />
                           )}
                       </FormGroup>
                   </FormControl>
               </div>
               <div>
                   <Button variant="contained" color="primary"
                           onClick={() => this.props.getRecommendation(this.props.ingredientInventory.filter((ingredient) => ingredient.selected))}>
                       Generate Recommendation
                   </Button>
               </div>
               {this.props.recommendation["hits"] &&
               <div style={{display: 'flex', flexWrap: 'wrap', margin: '3%'}}>
                   {this.props.recommendation["hits"].map(recipe =>
                       <RecipeCard recipe={recipe}/>
                   )
                   }
               </div>
               }
           </div>
       );
   }

}

const mapStateToProps = (state) => { //name is by convention
    return { ingredientInventory: state.ingredientInventory,
             recommendation: state.recommendationStore }; //now it will appear as props
};


export default connect(mapStateToProps, {selectingIngredient, newRecommendation, clearRecommendation, getRecommendation})(Recommendation);
