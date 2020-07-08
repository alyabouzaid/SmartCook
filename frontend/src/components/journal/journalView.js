import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {loadJournalsData, addNewJournalData, deleteOneJournal, deleteAllJournal} from "../../actions/journalActions";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import parse from 'html-react-parser';

const useStyles = (theme) => ({
    root: {
        width: '66%',
    },
    media: {
        height: 200,
    },
});


class JournalView extends Component {

    componentDidMount() {
        this.props.loadJournalsData();
    }

    render() {

        const {classes} = this.props;
        return (
            <div style={{margin: '5%'}}>
            {this.props.journals.map((journal) =>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={journal.images[0].secure_url}
                        title={journal.title}
                    />
                    <CardContent>
                        <div style={{textAlign: "left"}}>
                        <h2> {journal.title} </h2>
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
    return {journals: state.journalsStore.journals}; //now it will appear as props
};

export default compose(withStyles(useStyles), connect(mapStateToProps, {
    loadJournalsData, addNewJournalData, deleteOneJournal, deleteAllJournal
}))(JournalView);
