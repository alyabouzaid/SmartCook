import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from "../../actions/journalActions";
import { FaImage } from "react-icons/all";

class JournalImage extends Component {

    render() {
        return(
        <div>
                {this.props.images.map(image => <img src={image.secure_url} alt=''/>)}
                {this.props.images.length < 3 &&
                <div>
                    <input type='file' id='singleUpload' className='inputfile' onChange={(e) => this.props.uploadImage(e)} />
                    <label htmlFor='multi' className='label'>
                        <FaImage size='2x'/>
                    </label>
                </div>
                }
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => { //name is by convention
    return { images: state.journalStore.images}; //now it will appear as props
};

export default connect(mapStateToProps, {uploadImage})(JournalImage);
