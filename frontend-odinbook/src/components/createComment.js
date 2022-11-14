import React from "react";
import {useEffect} from "react";

const CreateComment = ({postId}) => {

    const handleCommentCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        const id = e.target.id;
        
        console.log(comment);
        console.log(id);

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