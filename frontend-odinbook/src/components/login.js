import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';

function Login(){

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/home');
    }


    const [loginData, setLoginData] = useState({
        username: '',
        password:'',
      })
    
      function handleLogin(e) {
        const newData = {...loginData};
        newData[e.target.id] = e.target.value
        setLoginData(newData)
        // console.log(newData);
      }
    
    
      function loginSubmit(e) {
            e.preventDefault();
            console.log(loginData);
        
            const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
            }
        
            
            fetch('http://localhost:3000/auth/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
            console.log(data.accessToken);
            // localStorage.setItem('token', JSON.stringify(data.accessToken));
            localStorage.setItem('token', data.accessToken);
            })
            
            navigateHome();
        }
    return (
        <form id = "login">
          <h1> Login Form </h1>
          <label htmlFor = "username"> Username: </label> <br/>
          <input onChange={(e) => handleLogin(e)} value = {loginData.username} type = "text"  id = "username" name = "username"/> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input onChange={(e) => handleLogin(e)} value = {loginData.password} type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {loginSubmit}> Login </button> 
        </form>
    )
}

export default Login;