import React from "react";
import {useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import './css/create-comment.css'
const CreateComment = ({postId}) => {
    const navigate = useNavigate();

    const navigateTimeline = () => {
        navigate('/timeline');
    }


    const handleCommentCreate = (e) => {
        
        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        const postId = e.target.id;
        
        const token = localStorage.getItem('token');
        //Decoding JWT token
        const decoded = jwt_decode(token);
        // console.log("Comment:" + comment);
        // console.log('post id:' + postId);
        // console.log('user id:' + decoded.id);
        // console.log(localStorage.getItem('token'));

        

        console.log(decoded);

        try {
            const fetchSettings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth-token': JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({
                    text: comment,
                    postId: postId,
                    userId: decoded.id
                })
            }

            fetch("https://test-deploy-1.fly.dev/comments/create", fetchSettings);
            
        } catch (err){
            console.log(err);
        }
        navigateTimeline();
    }


    return (
        <div>
            
            <form className = "commentForm" onSubmit={(e) => handleCommentCreate(e)} id={postId} >
                <div>
                    <input claasName = "commentInput" name = "comment" type = "text" className = "commentInput" placeholder = "Write a comment" />
                    <button className = "submit-comment-button"> Comment Send </button>
                </div>
                
            </form>
        </div>
    )
}

export default CreateComment