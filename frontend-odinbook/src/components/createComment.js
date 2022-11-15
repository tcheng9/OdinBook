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
        console.log(comment);
        console.log('post id:' + postId);
        // console.log(localStorage.getItem('token'));

        const decoded = jwt_decode(token);

        console.log(decoded);
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