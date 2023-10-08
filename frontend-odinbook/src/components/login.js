import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import './css/login.css';

function Login(){
    //Gives button navigation functionality to redirect to a new page
    const navigate = useNavigate();

    const navigateTimeline = () => {
        navigate('/timeline');
    }


    // const navigateSignup = () => {
    //   navigate('/signup');
    // }

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
            
            navigateTimeline();
        }
    return (
      
      <body className = "login-page">

      
          <div className = "login-wrapper">
            <div className = "login-info">
                <div className = "login-info-wrapper">
                    <h1 className = "login-info-header"> OdinBook </h1>
                    <div className = "login-info-text" >
                        Connect with friends and the world around you on OdinBook
                    </div>
                </div>
            </div>

            <div className = "login-form-wrapper">
              <form className = "login-form" id = "login">
                
                <h1 className = "login-title"> Login Form </h1>
               
                <div className = "login-input-wrapper">
                  <input  className = "login-input" onChange={(e) => handleLogin(e)} value = {loginData.username} type = "text"  id = "username" name = "username" placeholder = "Username"/>
                  
                </div>
                  
                <div className = "login-input-wrapper">
                  <input className = "login-input" onChange={(e) => handleLogin(e)} value = {loginData.password} type = "text" id = "password" name = "password" placeholder = "Password"/> 

                </div>
                                  
             
                
           
               
                <div className = "login-button-wrapper">
                  <button className = "login-form-button" onClick = {loginSubmit}> Log in </button> 
                </div>
                
              </form>

              <hr className = "login-signup-split-line"/> 

              <div className = "signup-link-wrapper">
                {/* <button className = "signup-link-button" onClick = {navigateSignup}>
                    Create a New Account
                </button> */}
              </div>
              

            </div>
          </div>
        </body>
    )
}

export default Login;