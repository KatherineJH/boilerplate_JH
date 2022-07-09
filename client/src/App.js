
// import './App.css';
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";



// function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>

//         <hr />

//         <Routes>
//           <Route exact path="/" element = {<Home />} />
//           <Route path="/about" element = {<About />} />
//           <Route path="/dashboard" element = {<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }




import React, { Suspense } from 'react';
// import { Route, Switch } from "react-router-dom";
import AuthPage from './hoc/auth';
// pages for this product
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import MyLikePage from "./components/views/LikesPage/MyLikePage";

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside


function App() {
  // auth.js ->
  // export default function(SpecificComponent, option, adminRoute = null)
  // Ex) const Auth_XXX = AuthPage( {XXXPage} , false, true);
  const Auth_Lading = AuthPage( LandingPage, null); // null: 아무나 출입이 가능한 페이지
  const Auth_Login = AuthPage( LoginPage , false); // flase: 로그인 한 유저는 출입이 불가능한 페이지
  const Auth_Register = AuthPage( RegisterPage, false); // flase: 로그인 한 유저는 출입이 불가능한 페이지
  const Auth_MovieDetail = AuthPage( MovieDetail, null);
  const Auth_LikePage = AuthPage( MyLikePage, true);

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element = { <Auth_Lading />} />
              <Route exact path="/login" element = {<Auth_Login />} />
              <Route exact path="/register" element = {<Auth_Register />} />
              <Route exact path="/movie/:movieId" element = {<Auth_MovieDetail />} />
              <Route exact path="/favorite" element = {<Auth_LikePage />} />
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
