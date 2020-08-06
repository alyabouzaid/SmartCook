const initialState = {journals: []};

export default function formReducer(state = initialState, action) {
    switch (action.type) {
        case 'JOURNALS_LOAD':
            return {...state, journals: action.payload};
        case 'JOURNALS_ADD':
            return {...state, journals: [...state.journals, action.payload]};
        case 'JOURNALS_UPDATE':
            let updatedJournal = action.payload;
            return {
                ...state, journals: state.journals.map(obj => {
                    if (obj._id === updatedJournal._id) return updatedJournal; else return obj
                })
            };
        case 'JOURNALS_DELETE_ONE':
            return {...state, journals: state.journals.filter((journal) => journal._id !== action.payload)};
        case 'JOURNALS_DELETE_ALL':
            return initialState;
        default:
            return state;
    }

}
