import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import compose from "recompose/compose";
import {
    editJournal,
    updateTitle,
    addNewJournalData,
    updateJournalData,
    clearJournal,
} from "../../actions/journalActions";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./journal.css";
import JournalImage from "./journalImage";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {loadUserData} from "../../actions/userActions";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        textAlign: "left",
        textTransform: "capitalize",
        justifyContent: "left",
        fontSize: "16px",
        marginTop: 25,
    },
    editor: {
        marginBottom: 30,
    },
    copyright: {
        paddingTop: theme.spacing(3),
    },
});

class Journal extends Component {

    componentWillUnmount() {
        this.props.clearJournal();
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div style={{margin: "5%"}}>
                    &nbsp;
                    <Grid container spacing={2} className={classes.root}>
                        <Grid item xs={9}>
                            <form
                                noValidate
                                autoComplete="off"
                                style={{marginBottom: "5%"}}
                            >
                                <TextField
                                    id="standard-basic"
                                    label="Title"
                                    fullWidth
                                    value={this.props.editorData.title}
                                    onChange={(e) => this.props.updateTitle(e.target.value)}
                                />
                            </form>
                            <CKEditor
                                className={classes.editor}
                                editor={ClassicEditor}
                                data={this.props.editorData.initialData}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.props.editJournal(data);
                                }}
                            />
                            {this.props.editorData._id.length === 0 ? (
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        this.props.addNewJournalData(
                                            this.props.editorData,
                                            this.props.userInfo
                                        );
                                        this.props.history.push("/journalView");
                                    }}
                                >
                                    SUBMIT
                                </Button>
                            ) : (
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        this.props.updateJournalData(this.props.editorData);
                                        this.props.history.push("/journalView");
                                    }}
                                >
                                    UPDATE JOURNAL
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            <JournalImage/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editorData: state.journalEditorStore,
        userInfo: state.userStore,
        darkMode: state.colorStore,
    };
};

export default compose(
    withStyles(useStyles),
    withRouter,
    connect(mapStateToProps, {
        editJournal,
        updateTitle,
        addNewJournalData,
        updateJournalData,
        loadUserData,
        clearJournal,
    })
)(Journal);
