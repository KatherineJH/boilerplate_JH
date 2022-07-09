import axios from 'axios';
import { 
    USER_LOGIN,
    USER_REGISTER,
    USER_AUTHENTICATE, 
    USER_LOGOUT
} from './types';
import { USER_SERVER } from '../Config.js';

export function loginUser(dataToSubmit){
    
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data)
    return { // return을 해서 reducer로 보낸다.
        type: USER_LOGIN,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data)
    return { // return을 해서 reducer로 보낸다.
        type: USER_REGISTER,
        payload: request
    }
}

export function authenticate(){ // get은 (body) 부분이 필요 없다.
    
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data)
    return { // return을 해서 reducer로 보낸다.
        type: USER_AUTHENTICATE,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: USER_LOGOUT,
        payload: request
    }
}