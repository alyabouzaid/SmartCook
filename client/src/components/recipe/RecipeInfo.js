import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import LinkIcon from '@material-ui/icons/Link';
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/Save';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

import { getRecipeIngredients } from "../../actions/ingredientAmountActions";

import { connect } from "react-redux";
import compose from "recompose/compose";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 100, // increases image height
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        whiteSpace: "wrap",
        overflow: "hidden",
        minWidth: "0",
        textOverflow: "ellipsis", // doesn't work

    },
    title: {
        fontSize: "16px",
        fontWeight: "bold",
    },
}));

    export default function RecipeInfo(props) {

    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


// -----------------------------


    const handleClickDone = (event) => {
        props.getRecipeIngredients(props.recipe)
        console.log(props.ingredientInventory)
        // console.log(props.getRecipeIngredients(props.recipe))

    };

    // const [show, setShow] = useState(false);

    // // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

// --------------------------

    return (
        <div>


            {console.log(props.recipe["recipe"]["ingredientLines"][0].replace(/ /g,"%20"))} */}


            <Card className={classes.card} variant="outlined">
                <CardActionArea disableRipple>
                    <Link href={props.recipe["recipe"]["shareAs"]} target="_blank">
                        <CardMedia
                            className={classes.cardMedia}
                            image={props.recipe["recipe"]["image"]}
                            title={props.recipe["recipe"]["label"]}
                        />
                    </Link>
                </CardActionArea>
                <CardContent className={classes.cardContent} style={{height: "120px"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: "left"}}>
                        <Link href={props.recipe["recipe"]["shareAs"]} target="_blank" title={props.recipe["recipe"]["label"]} style={{ textDecoration: "none", color: "inherit" }}>
                            {props.recipe["recipe"]["label"]}
                        </Link>
                    </Typography>
                </CardContent>
                <CardActions disableRipple>
                    <IconButton aria-label="more info" onClick={handleClick}>
                        <InfoOutlinedIcon size="small"/>
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Card className={classes.card} variant="outlined">
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.title} paragraph >Ingredients:</Typography>
                                <Typography style={{textAlign: "left"}}>
                                    {props.recipe["recipe"]["ingredientLines"].map( (item) => <li> {item} </li>)}
                                </Typography>
                                <p style={{textAlign: "left", backgroundColor: "transparent", margin: "3", fontSize: '24px'}}/>
                                <Typography className={classes.title} paragraph>Health Labels:</Typography>
                                <Typography style={{textAlign: "left"}}>
                                    {props.recipe["recipe"]["dietLabels"].concat(props.recipe["recipe"]["healthLabels"]).map( (item) => <li> {item} </li>)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Popover>
                    <IconButton aria-label="share" href={props.recipe["recipe"]["url"]} target="_blank">
                        <LinkIcon size="small" />
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => {dispatch({type:'RECIPE_ANNOTATION', payload: props.recipe["recipe"]}); history.push('/journal')}}>
                        <EditOutlinedIcon size="small" />
                    </IconButton>
                    <IconButton aria-label="share">
                        <SaveOutlinedIcon size="medium" />
                    </IconButton>
                    


                    <IconButton aria-label="moreinfo" onClick={
                        handleClickDone
                        }>
                        <DoneIcon size="small"/>
                    </IconButton>

                    {/* toast.success("A new journal has been added", {
                   position: toast.POSITION.TOP_CENTER,
                   autoClose: 3000
               }); */}
                    {/* <Button variant="primary" onClick={handleShow}>
                            Launch demo modal
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal> */}


                    {/* <Popover
                        id={idd}
                        open={openn}
                        anchorEl={anchorEll}
                        onClose={handleClosee}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Card  variant="outlined">
                            <CardContent >
                                <Typography className={classes.title} paragraph >Ingredients:</Typography>
                                <Typography style={{textAlign: "left"}}> */}
                                    {/* {this.props.getRecipeIngredients(recipe["recipe"]["ingredientLines"])} */}
                                    {/* {this.props.ingredientAmountStore.map((item) => <li>{item}</li>)} */}
                                    {/* <RecipeIngredientsAmounts recipe = {recipe}/>
                                </Typography> */}
                                {/* <p style={{textAlign: "left", backgroundColor: "transparent", margin: "3", fontSize: '24px'}}/>
                                <Typography className={classes.title} paragraph>Health Labels:</Typography>
                                <Typography style={{textAlign: "left"}}>
                                    {recipe["recipe"]["dietLabels"].concat(recipe["recipe"]["healthLabels"]).map( (item) => <li> {item} </li>)}
                                </Typography> */}
                            {/* </CardContent>
                        </Card>
                    </Popover> */}




                </CardActions>
            </Card>
        </div>
    );
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//     //   initialData: () => dispatch(initialData()),
//     //   addingIngredient: (emailAndIngredientObject) =>
//     //     dispatch(addingIngredient(emailAndIngredientObject)),
//     getRecipeIngredients: (ingredientLinesArray) => dispatch(getRecipeIngredients(ingredientLinesArray)),
//     //   deleteIngredient: (emailAndKeyObject, ingredientInventory) =>
//     //     dispatch(deleteIngredient(emailAndKeyObject, ingredientInventory)),
//     };
//   };
  
//   //state has entire state of app!!
//   const mapStateToProps = (state) => {
//     //name is by convention
//     return {
//       ingredientInventory: state.ingredientInventory,
//       ingredientAmountStore: state.ingredientAmountStore,
//     }; //now it will appear as props
//   };
  
//   export default compose(
//     // withStyles(useStyles),
//     connect(mapStateToProps, mapDispatchToProps))(RecipeInfo);
