import { combineReducers } from "redux";
import users from "./usersReducers"
import todos from "./todoReducers";

const userAndTodo = combineReducers({
    users,
    todos
});

export default userAndTodo;