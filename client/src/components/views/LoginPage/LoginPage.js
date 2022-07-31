
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const onEmailEvent = (event) => {
        setEmail(event.currentTarget.value)
    };
    const onPasswordEvent = (event) => {
        setPassword(event.currentTarget.value)
    };

    const onsubmitEvent = (event) => {
        event.preventDefault(); // prevent refresh window

        let dataToSubmit = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(dataToSubmit))
            .then(response => {
                if(response.payload.loginSuccess){
                    window.localStorage.setItem('userId', response.payload.userId);
                    if (rememberMe === true) {
                    window.localStorage.setItem('rememberMe', dataToSubmit.email);
                    } else {
                    window.localStorage.removeItem('rememberMe');
                    }
                    navigate('/');

                } else{
                    alert('Error')
                }
            })

    };

    return(
        <div className="loginBody" >
            <form onSubmit={onsubmitEvent}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailEvent} />
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordEvent} />
                <br/>
                <button>
                    Login
                </button>
            </form>    
        </div>
    )
}

export default LoginPage;









// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginUser } from '../../../_actions/user_action';
// import { useNavigate } from 'react-router-dom';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { Form, Input, Button, Checkbox, Typography } from 'antd';

// const { Title } = Typography;

// function LoginPage(props){
//     const navigate  = useNavigate();
//     const dispatch = useDispatch();
//     const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");

//     const [formErrorMessage, setFormErrorMessage] = useState('');
//     const [rememberMe, setRememberMe] = useState(rememberMeChecked);

//     const handleRememberMe = () => {
//         setRememberMe(!rememberMe)
//       };
    
//     const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';


//     const onEmailEvent = (event) => {
//         setEmail(event.currentTarget.value)
//     };
//     const onPasswordEvent = (event) => {
//         setPassword(event.currentTarget.value)
//     };

//     const onsubmitEvent = (event) => {
//         event.preventDefault(); // prevent refresh window

//         let body = {
//             email: Email,
//             password: Password
//         }

//         dispatch(loginUser(body))
//             .then(response => {
//                 if(response.payload.loginSuccess){
//                     window.localStorage.setItem('userId', response.payload.userId);
//                     if (rememberMe === true) {
//                     window.localStorage.setItem('rememberMe', body.email);
//                     } else {
//                     window.localStorage.removeItem('rememberMe');
//                     }
//                     navigate('/');

//                 } else{
//                     alert('Error')
//                 }
//             })

//     };

//     return(
//         <div className="loginBody" >
//             <form onSubmit={onsubmitEvent}>
//                 <label>Email</label>
//                 <input type="email" value={Email} onChange={onEmailEvent} />
                
//                 <label>Password</label>
//                 <input type="password" value={Password} onChange={onPasswordEvent} />
//                 <br/>
//                 <button>
//                     Login
//                 </button>
//             </form>    
//         </div>
//     )
// }

// export default LoginPage;







