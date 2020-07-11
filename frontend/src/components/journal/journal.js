import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  editJournal,
  updateTitle,
  addNewJournalData,
} from "../../actions/journalActions";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./journal.css";

import parse from "html-react-parser";
import Header from "../login/Header";
import JournalImage from "./journalImage";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { loadUserData } from "../../actions/userActions";

import Typography from "@material-ui/core/Typography";
import pic from "../ingredientInventory/image5.jpg"

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Journal extends React.Component {
  componentDidMount() {
    this.props.loadUserData();
  }

  defaultPage() {
    return (
      <div
        style={{
          backgroundImage: `url(${pic})`,
          height: 1000,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <h1>You must log in</h1>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return this.props.userInfo.isLoggedIn ? (
      <div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
        <Header />
        <div style={{ margin: "5%" }}>
          <Typography variant="h4" style={{background: 'rgba(255, 255, 255, 0.6)'}}>
            Your Personal Journal
          </Typography>
          &nbsp;
          <form noValidate autoComplete="off" style={{ marginBottom: "5%" }}>
            <TextField
              id="standard-basic"
              label="Title"
              fullWidth
              value={this.props.editorData.title}
              onChange={(e) => this.props.updateTitle(e.target.value)}
              style={{background: 'rgba(255, 255, 255, 0.6)'}}
            />
          </form>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={9}>
              <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onInit={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.props.editJournal(data);
                  console.log({ event, editor, data });
                }}
              />
            </Grid>
            <Grid item xs={3}>
              {/*{parse(this.props.editorData.body)}*/}
              <JournalImage />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.addNewJournalData(this.props.editorData)}
          >
            Submit Journal
          </Button>
        </div>
      </div>
    ) : (
      this.defaultPage()
    );
  }
}

const mapStateToProps = (state) => {
  //name is by convention
  return { editorData: state.journalEditorStore, userInfo: state.userStore }; //now it will appear as props
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, {
    editJournal,
    updateTitle,
    addNewJournalData,
    loadUserData,
  })
)(Journal);
