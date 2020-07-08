export const editJournal = (data) => {
    return {
        type: 'JOURNAL_EDITOR',
        payload: data
    };
};

export const addImage = (image) => {
    return {
       type: 'JOURNAL_ADD_IMAGE',
       payload: image
    };
};


export const uploadImage = e => {

    return async dispatch => {

        const files = Array.from(e.target.files);
        // this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        // formData.append("email", this.props.user.email);

        fetch("http://localhost:9000/images/image-upload", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                dispatch(addImage(images[0]))
            })
    }
};

