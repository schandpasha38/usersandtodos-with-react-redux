import { ADD_USER, DELETE_USER, EDIT_USER } from "../actions/userActions";

const initialState = {
    users: [{ "name": "user", "email": "user@user.com", "key": 0 }, { "name": "user1", "email": "user1@user1.com", "key": 1 }]
};

function storeUsersLocally(data) {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem("users", serializedState);
    } catch {
        return
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            storeUsersLocally([
                ...state.users,
                { ...action.payload, key: state.users.length }
            ]);
            return {
                ...state,
                users: [...state.users, { ...action.payload, key: state.users.length }]
            };

        case DELETE_USER:
            storeUsersLocally(state.users.filter(user => user.key !== action.key));
            return {
                ...state,
                users: state.users.filter(user => user.key !== action.key)
            };

        case EDIT_USER:
            let tempUsers = state.users.map(user => {
                if (user.key === action.key) {
                    return {
                        ...user,
                        name: action.payload.name,
                        email: action.payload.email
                    };
                } else return user;
            });
            storeUsersLocally(tempUsers);
            return {
                ...state,
                users: tempUsers
            };

        default:
            return state;
    }
}

export default userReducer