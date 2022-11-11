import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';

function FacebookLogin(){

  useEffect(() => {
    fetch('http://localhost:3000/auth/facebook')
      .then((response) => response.json())
      .then((actualData) => {
        localStorage.setItem('facebookInfo', actualData);
        console.log(actualData)

      })
      .catch((err) => {
        console.log(err.message);
      })    
  }, [])


  return (
    <a href = "http://localhost:3000/auth/facebook"> Facebook Login </a>
  )
    
}

export default FacebookLogin;