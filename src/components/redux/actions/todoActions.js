export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";

export const addTodo = payload => {
    return dispatch => {
        return dispatch({
            type: ADD_TODO,
            payload: payload
        });
    };
};

export const editTodo = (key, payload) => {
    return dispatch => {
        return dispatch({
            type: EDIT_TODO,
            key: key,
            payload: payload
        });
    };
};

export const deleteTodo = key => {
    return dispatch => {
        return dispatch({
            type: DELETE_TODO,
            key: key
        });
    };
};