import React from 'react';
import {useEffect, useState} from 'react';
import "./timeline.css";
import CreateComment from './createComment';
import Comment from "./comment";
import CreateLike from "./createLike";
import GetLikes from "./getLikes";

const Timeline = () => {

    const [postData, setPostData] = useState([]);

    const [comment, setComment] = useState({
        comment: '',
    });

    const [postId, setPostId] = useState('');

   

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
  
    //function to delete
    function deletePost(e){
        e.preventDefault();
        console.log('clicking delete btn');
    }
    
    const deletePostAPICall = async()=> {
        fetch('http://localhost:4000/posts/' + postId, {
            method:'POST',
            headers: {

            },
            body: JSON.stringify({
                postId: postId
            })
        })
    };

    return (
        
        <div>
            <a href = "/createpost"> Create a post </a>
            <a href = "/createprofile"> Create a profile </a>  
            <a href = "/profiles"> View all profiles </a>   

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
                        <button onClick = {deletePost}>
                            Delete
                        </button>
                        <CreateComment postId = {data._id}/>
                        <Comment postId = {data._id} />
                        <CreateLike postId = {data._id} />
                        <GetLikes postId = {data._id} />
                    </div>
                    
                )
            })}
            </ol>
        
            
        </div>
    )
}


export default Timeline;