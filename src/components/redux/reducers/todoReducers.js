import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../actions/todoActions";

const initialState = {
    todos: []
};

// { "action": "Todo", "dateadded": "2020-07-25T10:01", "key": 0 }, { "action": "Todo1", "dateadded": "2020-07-25T22:01", "key": 1 }

function storeTodosLocally(data) {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem("todos", serializedState);
    } catch {
        return
    }
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            storeTodosLocally([
                ...state.todos,
                { ...action.payload, key: state.todos.length }
            ]);
            return {
                ...state,
                todos: [...state.todos, { ...action.payload, key: state.todos.length }]
            };

        case DELETE_TODO:
            storeTodosLocally(state.todos.filter(todo => todo.key !== action.key));
            return {
                ...state,
                todos: state.todos.filter(todo => todo.key !== action.key)
            };

        case EDIT_TODO:
            let tempTodos = state.todos.map(todo => {
                if (todo.key === action.key) {
                    return {
                        ...todo,
                        action: action.payload.action,
                        dateadded: action.payload.dateadded
                    };
                } else return todo;
            });
            storeTodosLocally(tempTodos);
            return {
                ...state,
                todos: tempTodos
            };

        default:
            return state;
    }
}

export default todoReducer
