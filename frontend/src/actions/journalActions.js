export const updateTitle = (title) => {
    return {
        type: 'JOURNAL_EDITOR_TITLE',
        payload: title
    };
};


export const editJournal = (data) => {
    return {
        type: 'JOURNAL_EDITOR_BODY',
        payload: data
    };
};

export const addImage = (image) => {
    return {
       type: 'JOURNAL_EDITOR_ADD_IMAGE',
       payload: image
    };
};

export const submitJournal = () => {
    return {
        type: 'JOURNAL_EDITOR_SUBMIT',
    };
};


export const uploadImage = e => {

    return async dispatch => {

        const files = Array.from(e.target.files);

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

export const loadJournalsData = () => {
    return async dispatch => {
        fetch("http://localhost:9000/journals", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => res.json())
            .then((res) => {
            })
    }
};

export const addNewJournalData = (data) => {
    return async dispatch => {
        fetch("http://localhost:9000/journals/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
               dispatch(submitJournal());
            })
    }
};
