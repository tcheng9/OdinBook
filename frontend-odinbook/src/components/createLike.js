import React from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

//create like functionality
const CreateLike = ({postId}) => {
/////////////////////////////////////////
//THIS IS DEPRECATED, I MERGED THIS WITH getLikes
/////////////////////////////////////

    // const navigate = useNavigate();

    // const navigateTimeline = () => {
    //     navigate('/timeline');
    // }

    // const handleLike = (e) => {
    //     e.preventDefault();
        
    //     //NOTE: postId already exists so no need to get it

    //     //Getting userId
    //     const token = localStorage.getItem('token');
    //     const decoded = jwt_decode(token);
    //     const userId = decoded.id;

    //     try{
    //         const fetchSettings = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'auth-token': JSON.parse(localStorage.getItem('token'))
    //             },
    //             body: JSON.stringify({
    //                 postId: postId,
    //                 userId: userId,
    //             })
    //         }
            
    //         console.log(userId);

    //         const postUrl = "http://localhost:4000/posts/" + postId + "/likes?userId=${userId}";
            
    //         fetch(postUrl, fetchSettings);
            
    //     } catch (err) {

    //     }
    // }

    // return (
    //     <div> Placeholder</div>
    //     // <button className = "likeButton" onClick = {handleLike}> Like the post </button> 
    // )
}

export default CreateLike;

