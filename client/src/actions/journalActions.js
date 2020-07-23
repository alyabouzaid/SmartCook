import { toast } from 'react-toastify';

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

        fetch("/images/image-upload", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                dispatch(addImage(images[0]))
            })
    }
};

export const loadJournalsData = (email) => {
    return async dispatch => {
        fetch(`/journals/${email}`, {
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
        fetch("/journals/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
               dispatch(submitJournal());
               dispatch(addJournal(res));
               toast.success("A new journal has been added", {
                   position: toast.POSITION.TOP_CENTER,
                   autoClose: 3000
               });
            })
    }
};

export const deleteOneJournalData = (id) => {

    return async dispatch => {
        fetch(`/journals/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => {
                dispatch(deleteOneJournal(id));
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

export const annotateJournal = (recipe) => {
    return{
       type: 'RECIPE_ANNOTATION',
       payload: recipe
    };
};
