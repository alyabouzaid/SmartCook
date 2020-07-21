export const formConstants = {
    FORM_UPDATE_NAME: "FORM_UPDATE_NAME",
    FORM_UPDATE_MESSAGE: "FORM_UPDATE_MESSAGE",
    FORM_SUBMIT: "FORM_SUBMIT",
    FORM_CLEAR: "FORM_CLEAR",
};

export const updateFormMessage = input => {
    return{
        type: formConstants.FORM_UPDATE_MESSAGE,
        payload: input.target.value
    }
};

export const formSubmit = () => {
    return{
        type: formConstants.FORM_SUBMIT,
    }
};

export const clearForm = () => {
    return{
        type: formConstants.FORM_CLEAR,
    }
};