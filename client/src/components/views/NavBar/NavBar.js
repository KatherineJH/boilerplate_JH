import React, { useState } from 'react';
import './NavBar.css';
import axios from 'axios';
import { useSelector } from "react-redux";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const user = useSelector(state => state.user);

  const onClickEvent = () => {
    axios.get('/api/users/logout')
      .then(response => {
        console.log(response.data);
        if(!response.data.success){
          alert("Failed to log out!");
        } else{
          window.localStorage.removeItem('userId');
          alert("loged out successful!");
        }
      })
  };

  if (user.userData && !user.userData.isAuth) {
    return (
    
      <nav className='navbar'>
        <a href="/" className='navbar-logo'>My Movie Blog</a>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}
        style={{ marginBottom:'0'}}>
            <li className='nav-item'>
              <a href="/" className='nav-links' onClick={closeMobileMenu}> Home </a>
            </li>
            
            <li className='nav-item'>
              <a 
              href="/login" 
              className='nav-links' 
              onClick={closeMobileMenu}
              > 
                Log In
              </a>
            </li>
            <li className='nav-item'>
              <a 
              href="/register" 
              className='nav-links' 
              onClick={closeMobileMenu}
              > 
                Sign Up
              </a>
            </li>    
          </ul>
      </nav>
  
    )
  } else {
    return (
    
      <nav className='navbar'>
        <a href="/" className='navbar-logo'>My Movie Blog</a>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}
        style={{ marginBottom:'0'}}>
            <li className='nav-item'>
              <a href="/" className='nav-links' onClick={closeMobileMenu}> Home </a>
            </li>
            <li className='nav-item'>
              <a 
              href="/blog" 
              className='nav-links' 
              onClick={closeMobileMenu}
              > 
                My Board
              </a>
            </li>
            <li className='nav-item'>
              <a 
              href="/blog/upload" 
              className='nav-links' 
              onClick={closeMobileMenu}
              > 
                Post Blog 
              </a>
            </li>
            <li className='nav-item'>
              <a 
              href="/likes" 
              className='nav-links' 
              onClick={closeMobileMenu}
              > 
                My Likes
              </a>
            </li>

            <li className='nav-item'>
              <a 
              href="/" 
              className='nav-links' 
              onClick={onClickEvent}
              > 
                Log Out
              </a>
            </li>  
          </ul>
      </nav>
  
    )
  }
  
}

export default Navbar;
// export default withRouter(Navbar);
