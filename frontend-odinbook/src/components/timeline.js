import React from 'react';
import {useEffect, useState} from 'react';
import "./timeline.css";
import CreateComment from './createComment';
import Comment from "./comment";

const Timeline = () => {

    const [postData, setPostData] = useState([]);

    const [comment, setComment] = useState({
        comment: '',
    });

    function handleComment(e) {
        const newData = {...comment};
        newData[e.target.id] = e.target.value;
        setComment(newData)
        console.log(comment);
    }
    
    function commentSubmit(e) {
        e.preventDefault();
    }


    useEffect(() => {
        postList()
        
    }, [])
    
    const postList = async () => {
        const response = await fetch("http://localhost:3000/posts");
        setPostData(await response.json());
    }
  
    
    return (
        <div>
            <h1> Hello from timeline </h1>    
            <ol>

           {/* Mapping through post data and displaying each individual post */}
            {postData.map((data) => {
                return (
                    <div key = {data._id}>
                        <li className = "postItem"> {data.title} </li>
                         <li className = "postItem"> {data._id} </li>
                         {/* <form id = "comment">
                            <h1> comment Form </h1>

                            <label htmlFor = "comment"> Comment: </label> <br/>
                            <input onChange={(e) => handleComment(e)} value = {comment.comment} type = "text" id = "comment" name = "comment"/> <br/>

                            <button onClick = {commentSubmit}> Login </button> 
                        </form> */}
                        <CreateComment postId = {data._id}/>
                        <Comment postId = {data._id} />
                    </div>
                    
                )
            })}
            </ol>
            <a href = "/createpost"> Create a post </a>        
        </div>
    )
}


export default Timeline;