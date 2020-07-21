import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '25%', // TODO: commented out
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export default function RecipeCard({recipe}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={recipe["recipe"]["label"]}
            />
            <CardMedia
                className={classes.media}
                image={recipe["recipe"]["image"]}
                title={recipe["recipe"]["label"]}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{textAlign: "left"}}>
                    {recipe["recipe"]["dietLabels"].concat(recipe["recipe"]["healthLabels"]).map( (item) => <li> {item} </li>)}
                    <p>Calories: {Number(recipe["recipe"]["calories"]).toFixed(0)} </p>
                    <p>Time: {recipe["recipe"]["totalTime"]} min </p>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" href={recipe["recipe"]["shareAs"]} >
                    <ShareIcon />
                </IconButton>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Ingredients:</Typography>
                    <Typography style={{textAlign: "left"}}>
                        {recipe["recipe"]["ingredientLines"].map( (item) => <li> {item} </li>)}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
