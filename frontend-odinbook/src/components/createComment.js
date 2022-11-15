import React from "react";
import {useEffect} from "react";
import jwt_decode from "jwt-decode";


const CreateComment = ({postId}) => {

    const handleCommentCreate = (e) => {
        e.preventDefault();
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

            fetch("http://localhost:4000/comments/create", fetchSettings);
           
        } catch (err){
            console.log(err);
        }
    }


    return (
        <div>
            
            <form onSubmit={(e) => handleCommentCreate(e)} id={postId} className = "commentForm">
                <input name = "comment" type = "text" className = "commentInput"/>
                <button className = "commentButton"> Send </button>
            </form>
        </div>
    )
}

export default CreateComment