import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './css/signup.css';

function Signup(){
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/');
    }
  

    //Setting signup data
    const [data, setData] = useState({
        username: '',
        password:'',
        
      })
    
    // function to update as user types in username/password
    function handle(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData);
    }

    //submit function for signup form
    function signupSubmit(e){
        e.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }

        console.log(data);
        

        fetch('http://localhost:3000/auth/signup', requestOptions)
        .then((data) => {
            console.log(data);
        })

        navigateLogin();
    }


    return (
        <div className = "signup-form" > 
            <form className = "form-wrapper" id = "signup">
                <h1 className = "form-title"> Sign Up </h1>    
                <div className = "input-wrapper">
                    <label htmlFor = "username"> Username: </label> <br/>
                    <input onChange={(e) => handle(e)} value = {data.username} type = "text"  id = "username" name = "username"/> <br/>

                </div>
                
                <div className = "input-wrapper">
                    <label htmlFor = "password"> Password: </label> <br/>
                    <input onChange={(e) => handle(e)} value = {data.password} type = "text" id = "password" name = "password"/> <br/>
                </div>
                
                <button onClick = {signupSubmit}> Sign Up </button> 
            </form>
        </div>
    )
}

export default Signup;