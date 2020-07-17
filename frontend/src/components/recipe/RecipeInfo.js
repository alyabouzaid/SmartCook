import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

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

export default function RecipeInfo({recipe}) {
    const classes = useStyles();
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
                        <CardMedia
                            className={classes.cardMedia}
                            image={recipe["recipe"]["image"]}
                            // title={recipe["recipe"]["label"]}
                            title="Click for more info"
                            onClick={handleClick}
                        />
                </CardActionArea>
                <CardContent className={classes.cardContent} style={{height: "100px"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: "center"}}>
                        <Link href={recipe["recipe"]["shareAs"]} title="Click for recipe" style={{ textDecoration: "none", color: "inherit" }}>
                            {recipe["recipe"]["label"]}
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
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
                        <Typography className={classes.title} paragraph>Ingredients:</Typography>
                        <Typography style={{textAlign: "left"}}>
                            {recipe["recipe"]["ingredientLines"].map( (item) => <li> {item} </li>)}
                        </Typography>
                        <p style={{textAlign: "left", backgroundColor: "floralWhite", margin: "3", fontSize: '24px'}}/>
                        <Typography className={classes.title} paragraph>Health Labels:</Typography>
                        <Typography style={{textAlign: "left"}}>
                            {recipe["recipe"]["dietLabels"].concat(recipe["recipe"]["healthLabels"]).map( (item) => <li> {item} </li>)}
                        </Typography>
                        {/*<p style={{textAlign: "left", backgroundColor: "floralWhite", margin: "3", fontSize: '24px'}}/>*/}
                        {/*<Typography className={classes.title}>Calories: {Number(recipe["recipe"]["calories"]).toFixed(0)} kcal</Typography>*/}
                        {/*<p style={{textAlign: "left", backgroundColor: "floralWhite", margin: "3", fontSize: '24px'}}/>*/}
                        {/*<Typography className={classes.title}>Time: {recipe["recipe"]["totalTime"]} min </Typography>*/}
                    </CardContent>
                </Card>
            </Popover>
        </div>
    );
}