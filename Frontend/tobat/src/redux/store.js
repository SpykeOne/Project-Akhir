import { combineReducers } from "redux"
import { auth_reducer } from "./reducer/auth/auth"

export const rootReducer = combineReducers({
    auth: auth_reducer
})