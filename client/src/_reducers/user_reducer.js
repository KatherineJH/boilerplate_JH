import { 
    USER_LOGIN,
    USER_REGISTER,
    USER_AUTHENTICATE 
} from "../_actions/types";

export default function(state={}, action){
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, loginSuccess: action.payload} //...state -> empty state
            break;
        case USER_REGISTER:
            return { ...state, loginSuccess: action.payload} //...state -> empty state
            break;
        case USER_AUTHENTICATE:
            return { ...state, userData: action.payload} //...state -> empty state
            break;
        default:
            return state;
    }
}