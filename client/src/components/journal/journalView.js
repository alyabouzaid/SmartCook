import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import {
    loadJournalsData,
    addNewJournalData,
    deleteOneJournalData,
    importJournal,
} from "../../actions/journalActions";
import Footer from "../footer/footer";
import parse from "html-react-parser";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = (theme) => ({
    root: {
        height: "100vh",
        flexGrow: 1,
        justifyContent: "center",
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    space: {
        "& > *": {
            margin: theme.spacing(1),
        },
        textAlign: "right",
    },
    pagination: {
        display: "inline-block",
        textAlign: "center",
        marginBottom: 50,
    },
    copyright: {
        paddingTop: theme.spacing(3),
    },
});

class JournalView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            currentPage: 1,
            perPage: 5,
        };
    }

    componentDidMount() {
        this.props.loadJournalsData(this.props.userInfo.email);
    }

    handleOnPageChange = (currentPage) => {
        const selectedPage = currentPage;
        const offset = (selectedPage - 1) * this.state.perPage;
        this.setState({ currentPage: selectedPage });
        this.setState({ offset: offset });
        this.displayData();
    };

    handleOnSizeChange = (perPage) => {
        this.setState({ perPage, currentPage: 1 });
    };

    displayData = () => {
        const data = this.props.journals;
        const sliceData = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        return sliceData;
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <p
                    style={{
                        textAlign: "left",
                        backgroundColor: "transparent",
                        margin: "3",
                        fontSize: "24px",
                    }}
                />

                <Link
                    to={"/journal"}
                    style={{ textDecoration: "none", color: "inherit", padding: "5%" }}
                >
                    <label htmlFor="icon-button-file" style={{ justifyContent: "right" }}>
                        <Tooltip title="Click to create new post" arrow>
                            <IconButton
                                aria-label="upload picture"
                                component="span"
                                color="black"
                                style={{ position: "fixed", right: "5%" }}
                            >
                                <AddIcon size="large" style={{ width: 60, height: 60 }} />
                            </IconButton>
                        </Tooltip>
                    </label>
                </Link>
                <p
                    style={{
                        textAlign: "left",
                        backgroundColor: "transparent",
                        margin: "3",
                        fontSize: "24px",
                    }}
                />
                <div>
                    <Grid container component="main" className={classes.root} spacing={5}>
                        <Grid style={{ textAlign: "right" }} item xs={false} sm={4} md={12}>
                            <div className={classes.space}>
                                <p
                                    style={{
                                        textAlign: "left",
                                        backgroundColor: "transparent",
                                        margin: "3",
                                        fontSize: "24px",
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid style={{ textAlign: "right" }} item xs={false} sm={4} md={12}>
                            <div className={classes.space}>
                                <p
                                    style={{
                                        textAlign: "left",
                                        backgroundColor: "transparent",
                                        margin: "3",
                                        fontSize: "24px",
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={false} sm={4} md={7}>
                            <Container>
                                <Grid container spacing={5}>
                                    {this.displayData().map((journal) => (
                                        <Grid item xs={false} sm={4} md={12}>
                                            <Card
                                                key={journal.id}
                                                className={classes.card}
                                                varient="outlined"
                                            >
                                                <CardHeader
                                                    action={
                                                        <div>
                                                            <IconButton aria-label="settings">
                                                                <EditOutlinedIcon
                                                                    onClick={() => {
                                                                        this.props.importJournal(journal);
                                                                        this.props.history.push("/journal");
                                                                    }}
                                                                />
                                                            </IconButton>
                                                            <IconButton aria-label="settings">
                                                                <DeleteIcon
                                                                    onClick={() =>
                                                                        this.props.deleteOneJournalData(journal._id)
                                                                    }
                                                                />
                                                            </IconButton>
                                                        </div>
                                                    }
                                                    title={
                                                        <Typography
                                                            align="left"
                                                            variant="h6"
                                                            component="h2"
                                                        >
                                                            {journal.title}
                                                        </Typography>
                                                    }
                                                    subheader={
                                                        <Typography
                                                            align="left"
                                                            variant="subtitle2"
                                                            component="h2"
                                                        >
                                                            {journal.author}{" "}
                                                            {journal.createdAt.slice(0, -5).replace("T", " ")}
                                                        </Typography>
                                                    }
                                                />
                                                {journal.images.length > 0 && (
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={journal.images[0].secure_url}
                                                        title={journal.title}
                                                    />
                                                )}
                                                <CardContent>
                                                    <div style={{ textAlign: "left" }}>
                                                        {parse(journal.body)}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                            <p
                                style={{
                                    textAlign: "left",
                                    backgroundColor: "transparent",
                                    margin: "3",
                                    fontSize: "24px",
                                }}
                            />
                            <div className={classes.pagination}>
                                <SPagination
                                    page={this.state.currentPage}
                                    sizePerPage={this.state.perPage}
                                    totalSize={
                                        this.props.journals ? this.props.journals.length : 0
                                    }
                                    pagesNextToActivePage={5}
                                    sizePerPageOptions={[5, 8, 12]}
                                    onPageChange={this.handleOnPageChange}
                                    onSizeChange={this.handleOnSizeChange}
                                />
                                <div className={classes.copyright}>
                                    <Footer />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { journals: state.journalsStore.journals, userInfo: state.userStore };
};

export default compose(
    withStyles(useStyles),
    withRouter,
    connect(mapStateToProps, {
        loadJournalsData,
        addNewJournalData,
        deleteOneJournalData,
        importJournal,
    })
)(JournalView);
