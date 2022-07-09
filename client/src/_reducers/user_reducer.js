import { 
    USER_LOGIN,
    USER_REGISTER,
    USER_AUTHENTICATE, 
    USER_LOGOUT 
} from "../_actions/types";

export default function(state={}, action){
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, loginSuccess: action.payload} //...state 빈 상태로 가져옴
        case USER_REGISTER:
            return { ...state, loginSuccess: action.payload} //...state 빈 상태로 가져옴
        case USER_AUTHENTICATE:
            return { ...state, userData: action.payload} //...state 빈 상태로 가져옴
        case USER_LOGOUT:
            return {...state }    
        default:
            return state;
    }
}