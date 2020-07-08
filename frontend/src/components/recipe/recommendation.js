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

    constructor (props) {
        super(props);
        this.state = {
            isAuthenticated: true,
        };
    }

    componentDidMount () {
        fetch('http://localhost:9000/auth/user')
            .then(res => res.text())
            .then(res => {
                const user = JSON.parse(res);
                console.log(user);
                if (user) {
                    this.setState({isAuthenticated: user.isLoggedIn});
                }
            })
            .catch(err => err);
    }

    defaultPage() {
        return (<div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
            <Header/>
            <h1>You must log in</h1>
        </div>);
    }

   render() {
       return (this.state.isAuthenticated ?
           (<div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
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
           </div>) : (this.defaultPage())

       );
   }

}

const mapStateToProps = (state) => { //name is by convention
    return { ingredientInventory: state.ingredientInventory,
             recommendation: state.recommendationStore }; //now it will appear as props
};


export default connect(mapStateToProps, {selectingIngredient, newRecommendation, clearRecommendation, getRecommendation})(Recommendation);
