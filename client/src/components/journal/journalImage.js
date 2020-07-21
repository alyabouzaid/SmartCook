import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {uploadImage} from "../../actions/journalActions";
import {FaImage} from "react-icons/all";
import "./journalImage.css";
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 300,
        height: 300,
    },
});


class JournalImage extends Component {

    render() {

        const {classes} = this.props;

        return (
            <div>
                <div className={classes.root}>
                    <GridList cellHeight={180} className={classes.gridList}>
                            {this.props.images.map(image =>
                                <GridListTile>
                                <img src={image.secure_url} alt=''/>
                                </GridListTile>)}
                    </GridList>
                </div>
                {this.props.images.length < 3 &&
                <div>
                    <input type='file' id='singleUpload' className='inputfile'
                           onChange={(e) => this.props.uploadImage(e)}/>
                    <label htmlFor='singleUpload' className='label'>
                        <FaImage size='50%'/>
                    </label>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => { //name is by convention
    return {images: state.journalEditorStore.images}; //now it will appear as props
};

export default compose(withStyles(useStyles), connect(mapStateToProps, {uploadImage}))(JournalImage);
