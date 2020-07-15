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

        // formData.append("user", user);

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
                dispatch(loadJournals(res));
            })
    }
};

export const addNewJournalData = (editorData, userInfo) => {

    let data = {...editorData, author: userInfo.firstName, email: userInfo.email};

    return async dispatch => {
        fetch("http://localhost:9000/journals/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
               dispatch(submitJournal());
               dispatch(addJournal(res));
            })
    }
};

export const loadJournals = (journals) => {
    return {
        type: 'JOURNALS_LOAD',
        payload: journals
    };
};

export const addJournal = (journal) => {
    return {
        type: 'JOURNALS_ADD',
        payload: journal
    };
};

export const deleteOneJournal = (id) => {
    return {
        type: 'JOURNALS_DELETE_ONE',
        payload: id
    };
};

export const deleteAllJournal = () => {
    return {
        type: 'JOURNALS_DELETE_ALL',
    };
};
