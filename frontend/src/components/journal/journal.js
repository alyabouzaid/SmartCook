import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {editJournal} from "../../actions/journalActions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './journal.css';

import parse from 'html-react-parser';
import JournalImage from "./journalImage";

import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
});

class Journal extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <h2>Your personal Journal</h2>
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xs={9}>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.props.editJournal(data);
                                console.log({event, editor, data});
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        {/*{parse(this.props.editorData)}*/}
                        <JournalImage/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => { //name is by convention
    return {editorData: state.journalStore.body}; //now it will appear as props
};

export default compose(withStyles(useStyles), connect(mapStateToProps, {editJournal}))(Journal);
