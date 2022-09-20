import post_types from "./type";

const init_state = {
    value: false
}

const category_reducer = (state= init_state, action) => {
    if(action.type == category_types.CATEGORY_RENDER) {
        return{
            ...state,
            value: action.payload.value
            
        }
    }
    return state
}

export default category_reducer