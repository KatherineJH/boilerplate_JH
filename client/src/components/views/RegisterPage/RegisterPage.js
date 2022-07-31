
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate  = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailEvent = (event) => {
      setEmail(event.currentTarget.value)
  };
  const onNameEvent = (event) => {
    setName(event.currentTarget.value)
  };
  const onPasswordEvent = (event) => {
      setPassword(event.currentTarget.value)
  };
  const onRePasswordEvent = (event) => {
    setConfirmPassword(event.currentTarget.value)
  };

  const onsubmitEvent = (event) => {
      event.preventDefault(); // prevent refresh window

      if(Password !== ConfirmPassword){
        return alert("The password and confirmed password must be matched!")
      }

      let body = {
          email: Email,
          name: Name,
          password: Password
      }

      // const navigate = useNavigate();

      dispatch(registerUser(body))
          .then(response => {
              if(response.payload.success){
                  navigate('/login');

              } else{
                  alert('Failed')
              }
          })

  };

  return (
    <div className="registerBody" 
    // style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}
      >
      <form onSubmit={onsubmitEvent}>
      {/* style={{ display:'flex', flexDirection:'column'}} */}
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailEvent} />

        <label>User Name</label>
        <input type="text" value={Name} onChange={onNameEvent} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordEvent} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onRePasswordEvent} />
        <br/>
        <button>
            Sign Up
        </button>
      </form>
      
  </div>
  )
}

export default RegisterPage;


