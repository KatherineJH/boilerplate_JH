
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import MainImage from "../LandingPage/MainImage";
import { API_URL, API_KEY, IMAGE_URL } from "../../../Config";
import '../LandingPage/LandingPage.css';

function RegisterPage() {
  const navigate  = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

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
  const onNameEvent = (event) => {
    setName(event.currentTarget.value);
  };
  
  const onPasswordEvent = (event) => {
      setPassword(event.currentTarget.value)
  };
  const onRePasswordEvent = (event) => {
    setConfirmPassword(event.currentTarget.value)
  };

  const onsubmitEvent = (event) => {
      event.preventDefault(); // prevent refresh window

      // email validation
      let emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
      if (!emailRegExp.test(Email)) {
        alert("Your email is invalid! \nEx) abcde123@google.com");
        return false;
      }

      // user name validation
      let nameRegExp = /^[a-zA-z ]{3,20}$/; // allow space.
      if (!nameRegExp.test(Name)) {
        alert("Sorry, this is invalid name.");
        return false;
      } 

      // password length validation
      if (Password.length <= 5) {
        alert("Password: enter any characters, but must be longer than 5");
        return false;
      }

      // ConfirmPassword validation
      if(Password !== ConfirmPassword){
        alert("The password and confirmed password must be matched!");
        return false;
      }

      let body = {
          email: Email,
          name: Name,
          password: Password
      }

      dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                navigate('/login');
            } else{
                alert('This user is already exist!')
            }
        })
  };

  return (
    <div style={{ width: '100%'}}>
    {MainMovieImage &&
      <MainImage
          image={`${IMAGE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
      />
  }
    <div className="registerBody">
      <form onSubmit={onsubmitEvent}>
      {/* style={{ display:'flex', flexDirection:'column'}} */}
        <label>Email</label>
        <input 
          name="email" 
          type="email" 
          placeholder="Email address" 
          value={Email} 
          onChange={onEmailEvent} />

        <label>User Name</label>
        <input 
          name="name"
          type="text" 
          placeholder="Length: 3-20" 
          value={Name} 
          onChange={onNameEvent} />

        <label>Password</label>
        <input 
          name="password" 
          type="password" 
          placeholder="Must be longer than 5 digits" 
          value={Password} 
          onChange={onPasswordEvent} />

        <label>Confirm Password</label>
        <input 
          name="ConfirmPassword"
          type="password" 
          placeholder="Must be longer than 5 digits" 
          value={ConfirmPassword} 
          onChange={onRePasswordEvent} />
        <br/>
        <button>
            Sign Up
        </button>
      </form>
      </div>
  </div>
  )
}

export default RegisterPage;

