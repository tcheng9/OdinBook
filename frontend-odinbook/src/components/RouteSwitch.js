import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
//Route files
import App from "../App";

import Home from "./home"
import Signup from "./signup"
import Login from "./login";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<App />, <Login />]} />
        
        <Route path = "/home" element = {<Home />} />
        <Route path = "/signup" element = {<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;