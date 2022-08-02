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
  const AuthLading = AuthPage( LandingPage, null); // null: any user can pass
  const AuthLogin = AuthPage( LoginPage , false); // flase: loged- in user can not pass in 
  const AuthRegister = AuthPage( RegisterPage, false); // flase: loged-in user can not pass in 
  const AuthAboutMovie = AuthPage( MovieDetailPage, null); // null: any user can pass
  const AuthMyLike = AuthPage( MyLikesPage, true); // null: loged in user can pass
  const AuthBoard = AuthPage( BoardPage, true); // null: loged in user can pass
  const AuthPost = AuthPage( PostPage, true); // null: loged in user can pass
  const AuthBlog = AuthPage( BlogPage, true); // null: loged in user can pass
  

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
                <Route exact path="/" element = { <AuthLading />} />
                <Route exact path="/login" element = {<AuthLogin />} />
                <Route exact path="/register" element = {<AuthRegister />} />
                <Route exact path="/movie/:movieId" element = {<AuthAboutMovie />} />
                <Route exact path="/likes" element = {<AuthMyLike />} />
                <Route exact path="/blog" element = {<AuthBoard />} />
                <Route exact path="/blog/upload" element = {<AuthPost />} />
                <Route exact path="/blog/:blogId" element = {<AuthBlog />} />
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
