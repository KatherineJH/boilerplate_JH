import axios from 'axios';
import { 
    USER_LOGIN,
    USER_REGISTER,
    USER_AUTHENTICATE,
    LOGOUT_USER 
} from './types';
import { USER_SERVER } from '../Config';

export function loginUser(dataToSubmit){
    
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
    return { // return을 해서 reducer로 보낸다.
        type: USER_LOGIN,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)
    return { // return을 해서 reducer로 보낸다.
        type: USER_REGISTER,
        payload: request
    }
}

export function authenticate(){ // get은 (body) 부분이 필요 없다.
    
    const request = axios.get('/api/users/auth')
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
        type: LOGOUT_USER,
        payload: request
    }
}

