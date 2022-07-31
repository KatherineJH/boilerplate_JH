import './App.css';
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import MovieDetailPage from './components/views/AboutMovie/AboutMovie';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import AuthPage from './hoc/auth';
import MyLikesPage from './components/views/MyLikesPage/MyLikesPage';
import BoardPage from './components/views/BoardPage/BoardPage';
import PostPage from './components/views/BoardPage/PostPage';
import BlogPage from './components/views/BoardPage/BlogPage';

function App() {
  // auth.js ->
  // export default function(SpecificComponent, option, adminRoute = null)
  // Ex) const Auth_XXX = AuthPage( {XXXPage} , false, true);
  const Auth_Lading = AuthPage( LandingPage, null); // null: any user can pass
  const Auth_Login = AuthPage( LoginPage , false); // flase: loged- in user can not pass in 
  const Auth_Register = AuthPage( RegisterPage, false); // flase: loged-in user can not pass in 
  const Auth_AboutMovie = AuthPage( MovieDetailPage, null); // null: any user can pass
  // const Auth_LogOut = AuthPage( NavBar, true); // null: loged in user can pass
  const Auth_MyLike = AuthPage( MyLikesPage, true); // null: loged in user can pass
  const Auth_Board = AuthPage( BoardPage, true); // null: loged in user can pass
  const Auth_Post = AuthPage( PostPage, true); // null: loged in user can pass
  const Auth_Blog = AuthPage( BlogPage, true); // null: loged in user can pass
  

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div id='wrapper'>
        <NavBar />
        <div 
        // style={{ padding: '20px', minHeight: 'calc(100vh - 80px)' }}
        >
          <Router>
            <div>
              <Routes>
                <Route exact path="/" element = { <Auth_Lading />} />
                <Route exact path="/login" element = {<Auth_Login />} />
                <Route exact path="/register" element = {<Auth_Register />} />
                {/* <Route exact path="/logout" element = {<Auth_LogOut />} /> */}
                <Route exact path="/movie/:movieId" element = {<Auth_AboutMovie />} />
                <Route exact path="/likes" element = {<Auth_MyLike />} />
                <Route exact path="/blog" element = {<Auth_Board />} />
                <Route exact path="/blog/upload" element = {<Auth_Post />} />
                <Route exact path="/blog/:blogId" element = {<Auth_Blog />} />
              </Routes>
            </div>          
          </Router>        
        </div> 
      </div>
      <Footer></Footer> 
    </Suspense> 
  );
}

export default App;
