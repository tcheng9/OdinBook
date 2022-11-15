import React from 'react';
import jwt_decode from "jwt-decode";

const Comment = ({postId}) => {

    const handleGetAllComments = (e) => {
        e.preventDefault();

        try{
            const fetchSettings = {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json'
                }
                
            }

            fetch("http://localhost:4000/comments", fetchSettings)
            .then(response => response.json())
            .then(data => console.log(data));


        } catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            <h1>  Testing comnnection </h1>
            <h1> {postId} </h1> 
            <button onClick = {handleGetAllComments}> Get comment</button>
        </div>
    )
};

export default Comment