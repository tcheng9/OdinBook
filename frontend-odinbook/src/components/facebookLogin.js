import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';

function FacebookLogin(){

  useEffect(() => {
    fetch('https://test-deploy-1.fly.dev/auth/facebook')
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
    // I think this needs to be ahref to the frontend url BUT not sure at time of testing deployment -> maybe I should be using useNaviagete()
    <a href = "http://localhost:3000/auth/facebook"> Facebook Login </a>
  )
    
}

export default FacebookLogin;