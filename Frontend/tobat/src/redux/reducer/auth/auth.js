import auth_types from "./type";

const init_state = {
    id: 0,
    username: "",
    email: "",
    password: "",
    name: "",
    profile_picture: "",
    is_verified: false,
    is_admin: false
}

export function auth_reducer(state = init_state, action){

    if(action.type === auth_types.AUTH_LOGIN){
        return{
            ...state,
            id: action.payload?.id,
            username: action.payload.username,
            email: action.payload.email,
            password: action.payload.password,
            name: action.payload.name,
            profile_picture: action.payload.profile_picture,
            is_verified: action.payload.is_verified,
            is_admin: action.payload.is_admin
        }
    } else if (action.type === auth_types.AUTH_LOGOUT){
        return init_state
    }

    return state
}