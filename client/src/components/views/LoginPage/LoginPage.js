
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import MainImage from "../LandingPage/MainImage";
import { API_URL, API_KEY, IMAGE_URL } from "../../../Config";
import '../LandingPage/LandingPage.css';


function LoginPage(){
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])


    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results])
                setMainMovieImage(response.results[0])
            })
    }

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
        <div style={{ width: '100%'}} >
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div className="loginBody">
            <form onSubmit={onsubmitEvent}>
                <label>Email</label>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={Email} onChange={onEmailEvent} />
                
                <label>Password</label>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Enter your password"
                    value={Password} onChange={onPasswordEvent} />
                <br/>
                
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <button style={{ width:'100px'}}> Login </button>
                    <a href="/register">Or Register now!</a>
                </div>
                
            </form>    
            </div>
        </div>
    )
}

export default LoginPage;
















