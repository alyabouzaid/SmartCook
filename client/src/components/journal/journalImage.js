import React, {Component} from "react";
import {connect} from "react-redux";
import compose from "recompose/compose";
import {uploadImage} from "../../actions/journalActions";
import {FaImage} from "react-icons/all";
import "./journalImage.css";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = (theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
    },
    images: {
        width: 300,
        height: 300,
    },
    journalImage: {
        marginTop: 100,
    },
});

class JournalImage extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.images}>
                        {this.props.images.map((image) => (
                                <img src={image.secure_url} alt="" style={{width: "80%"}}/>
                        ))}
                    </div>
                </div>
                <div className={classes.journalImage}>
                    <input
                        type="file"
                        id="singleUpload"
                        className="inputfile"
                        onChange={(e) => this.props.uploadImage(e)}
                    />
                    <Tooltip title="Click to upload picture" arrow>
                        <label htmlFor="singleUpload" className="label">
                            <FaImage size="30%"/>
                        </label>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {images: state.journalEditorStore.images};
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, {uploadImage})
)(JournalImage);
