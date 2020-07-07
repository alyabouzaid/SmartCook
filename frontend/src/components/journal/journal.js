import React, { Component } from 'react';
import { connect } from 'react-redux';
import {editJournal} from "../../actions/journalActions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './journal.css';

import parse from 'html-react-parser';
import JournalImage from "./journalImage";

class Journal extends Component {

    render() {
        return (
            <div className="Journal">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.props.editJournal(data);
                        console.log( { event, editor, data } );
                    } }
                />
                <div className = "editorData">
                {parse(this.props.editorData)}
                </div>
                <JournalImage />
            </div>
        );
    }
}

const mapStateToProps = (state) => { //name is by convention
    return { editorData: state.journalStore.body}; //now it will appear as props
};

export default connect(mapStateToProps, {editJournal})(Journal);
