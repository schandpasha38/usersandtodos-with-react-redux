export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";

export const addUser = payload => {
    return dispatch => {
        return dispatch({
            type: ADD_USER,
            payload: payload
        });
    };
};

export const editUser = (key, payload) => {
    return dispatch => {
        return dispatch({
            type: EDIT_USER,
            key: key,
            payload: payload
        });
    };
};

export const deleteUser = key => {
    return dispatch => {
        return dispatch({
            type: DELETE_USER,
            key: key
        });
    };
};
