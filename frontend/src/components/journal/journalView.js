import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {loadJournalsData, addNewJournalData, deleteOneJournalData} from "../../actions/journalActions";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import parse from 'html-react-parser';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

const useStyles = (theme) => ({
    root: {
        width: '70%',
    },
    media: {
        height: 300,
    },
});


class JournalView extends Component {

    componentDidMount() {
        this.props.loadJournalsData(this.props.userInfo.email);
    }

    render() {

        const {classes} = this.props;
        return (
            <div style={{margin: '5%'}}>
                <h1> Your Cooking Journals</h1>
                <Link
                    to={"/journal"}
                    style={{textDecoration: "none", color: "inherit"}}
                >
                    <Button
                        href=""
                        color="inherit"
                        target="_blank"
                        size="small"
                        onClick=""
                    >
                        Add A New Journal
                    </Button>
                </Link>
                {this.props.journals.map((journal) =>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardHeader
                                action={
                                    // this.props.userInfo.email === journal.email &&
                                    <IconButton aria-label="settings">
                                        <DeleteIcon
                                            onClick={() => this.props.deleteOneJournalData(journal._id)}
                                        />
                                    </IconButton>
                                }
                                title={
                                    <Typography align="left" variant="h6" component="h2">
                                        {journal.title}
                                    </Typography>
                                }
                                subheader={
                                    <Typography align="left" variant="subtitle2" component="h2">
                                        {journal.author} {journal.createdAt.slice(0, -5).replace("T", " ")}
                                    </Typography>
                                }
                            />
                            {journal.images.length > 0 &&
                            <CardMedia
                                className={classes.media}
                                image={journal.images[0].secure_url}
                                title={journal.title}
                            />}
                            <CardContent>
                                <div style={{textAlign: "left"}}>
                                    {parse(journal.body)}
                                </div>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>)}
            </div>)
    }
}

const mapStateToProps = (state) => { //name is by convention
    return {journals: state.journalsStore.journals, userInfo: state.userStore}; //now it will appear as props
};

export default compose(withStyles(useStyles), connect(mapStateToProps, {
    loadJournalsData, addNewJournalData, deleteOneJournalData
}))(JournalView);
