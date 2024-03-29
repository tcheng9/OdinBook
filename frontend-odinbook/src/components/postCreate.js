import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import jwt_decode from "jwt-decode";
import './css/create-post.css';
const PostCreate = () => {

    //Creating function to navigate to timeline page
    const navigate = useNavigate(); 

    const navigateTimeline = () => {
        navigate('/timeline');
    }

    //Form data initial state
    const [formData, setFormData] = useState({
        title: '',
        authorId:'',
        commentId:'',
        message: '',
        likes:'',
    })

    //Function to decode JWT and get userID
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    



    //funciton to handle user's submitting data into form sections
    function handlePost(e) {
        const newData = {...formData};
        newData[e.target.id] = e.target.value;
        newData["authorId"] = userId;
        setFormData(newData);

        console.log(newData);
    }

    //Handle form submit
    function formSubmit(e) {
        e.preventDefault();
       
            
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }
    
        
        fetch('http://localhost:4000/posts/create', requestOptions)
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
       
        });
        navigateTimeline();
    }

    return (
        <div className = "createpost-wrapper">
            <form className = "createpost-form" id = "createpost">
                <h1 className = "createpost-title"> Create a post </h1>

                
                <div className = "createpost-input-wrapper">
                    {/* <label htmlFor = "title"> Post Title </label> <br/> */}
                     <input onChange={(e) => handlePost(e)} value = {formData.title} type = "text" id = "title" name = "title" placeholder ="Post Title" /> <br/>

                    {/* <label htmlFor = "message"> message </label> <br/> */}
                    <input onChange={(e) => handlePost(e)} value = {formData.message} type = "text" id = "message" name = "message" placeholder = "Post Content" /> <br/>

                </div>
               
                
                <button className = "submitpost-btn" onClick = {formSubmit}> Create Post </button> 
            </form>
        </div>
    )
    
    // const navigate = useNavigate();

    // const navigateTimeline = () => {
    //     navigate('/timeline');
    // }


    // const [formData, setLoginData] = useState({
    //     username: '',
    //     password:'',
    //   })
    
    //   function handleLogin(e) {
    //     const newData = {...loginData};
    //     newData[e.target.id] = e.target.value
    //     setLoginData(newData)
    //     // console.log(newData);
    //   }
    
    
    //   function loginSubmit(e) {
    //         e.preventDefault();
    //         console.log(loginData);
        
    //         const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(loginData)
    //         }
        
            
    //         fetch('http://localhost:3000/auth/login', requestOptions)
    //         .then((response) => response.json())
    //         .then((data) => {
    //         console.log(data.accessToken);
    //         // localStorage.setItem('token', JSON.stringify(data.accessToken));
    //         localStorage.setItem('token', data.accessToken);
    //         })
            
    //         navigateTimeline();
    //     }
    // return (

    //   <div>
    //     <form id = "createpost">
    //       <h1> Create a post  </h1>
    //       <label htmlFor = "username"> Username: </label> <br/>
    //       <input onChange={(e) => handleLogin(e)} value = {loginData.username} type = "text"  id = "username" name = "username"/> <br/>

    //       <label htmlFor = "password"> Password: </label> <br/>
    //       <input onChange={(e) => handleLogin(e)} value = {loginData.password} type = "text" id = "password" name = "password"/> <br/>

    //       <button onClick = {loginSubmit}> Create Post </button> 
    //     </form>

    //     <a href = "/timeline"> Back to timeline </a>

    //   </div>
        
    // )
}

export default PostCreate;
