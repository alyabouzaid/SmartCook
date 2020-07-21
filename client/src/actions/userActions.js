export const loadUserData = () => {
    return async dispatch => {
        fetch("/auth/user", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(loadUserInfo(res));
            })
    }
};

export const loadUserInfo = (userInfo) => {
    return {
        type: 'USER_LOAD',
        payload: userInfo
    };
};
