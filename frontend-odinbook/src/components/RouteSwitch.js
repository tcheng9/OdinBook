import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
//Route files
import App from "../App";
import Home from "./home"
import Signup from "./signup"
import Login from "./login";
import FacebookLogin from "./facebookLogin";
import Timeline from "./timeline";
import PostCreate from "./postCreate";


const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<App />, <Login />]} />
        <Route path = "/facebook" element = {<FacebookLogin />} />
        <Route path = "/home" element = {<Home />} />
        <Route path = "/timeline" element = {<Timeline />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/createpost" element = {<PostCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;