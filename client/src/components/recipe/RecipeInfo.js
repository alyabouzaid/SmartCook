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

export default function RecipeInfo({recipe, userInfo, saveRecipe}) {
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

    return (
        <div>
            <Card className={classes.card} variant="outlined">
                <CardActionArea disableRipple>
                    <Link href={recipe["recipe"]["shareAs"]} target="_blank">
                        <CardMedia
                            className={classes.cardMedia}
                            image={recipe["recipe"]["image"]}
                            title={recipe["recipe"]["label"]}
                        />
                    </Link>
                </CardActionArea>
                <CardContent className={classes.cardContent} style={{height: "150px"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: "left"}}>
                        <Link href={recipe["recipe"]["shareAs"]} target="_blank" title={recipe["recipe"]["label"]} style={{ textDecoration: "none", color: "inherit" }}>
                            {recipe["recipe"]["label"]}
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
                                    {recipe["recipe"]["ingredientLines"].map( (item) => <li> {item} </li>)}
                                </Typography>
                                <p style={{textAlign: "left", backgroundColor: "transparent", margin: "3", fontSize: '24px'}}/>
                                <Typography className={classes.title} paragraph>Health Labels:</Typography>
                                <Typography style={{textAlign: "left"}}>
                                    {recipe["recipe"]["dietLabels"].concat(recipe["recipe"]["healthLabels"]).map( (item) => <li> {item} </li>)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Popover>
                    <IconButton aria-label="share" href={recipe["recipe"]["url"]} target="_blank">
                        <LinkIcon size="small" />
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => {dispatch({type:'RECIPE_ANNOTATION', payload: recipe["recipe"]}); history.push('/journal')}}>
                        <EditOutlinedIcon size="small" />
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => saveRecipe(recipe, userInfo)}>
                        <SaveOutlinedIcon size="medium" />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}
