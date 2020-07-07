import React, { Component } from 'react';
import { connect } from 'react-redux';
import {editJournal} from "../../actions/journalActions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './journal.css';

import parse from 'html-react-parser';
import Header from "../login/Header";
import pic from "../login/landingPage.jpg";

class Journal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            isAuthenticated: true,
        };
    }

    componentDidMount () {
        fetch('http://localhost:9000/auth/user')
            .then(res => res.text())
            .then(res => {
                const user = JSON.parse(res);
                console.log(user);
                if (user) {
                    this.setState({isAuthenticated: user.isLoggedIn});
                }
            })
            .catch(err => err);
    }

    defaultPage() {
        return (<div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
            <Header/>
            <h1>You must log in</h1>
        </div>);
    }

    render() {
        return (this.state.isAuthenticated ?
            (<div className="Journal">
                <Header/>
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
            </div>)
                :
                (this.defaultPage())
        );
    }
}

const mapStateToProps = (state) => { //name is by convention
    return { editorData: state.journalStore}; //now it will appear as props
};

export default connect(mapStateToProps, {editJournal})(Journal);
