import React from 'react';
import {useEffect, useState} from 'react';
import "./timeline.css";

const Timeline = () => {

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        postList()
    }, [])
    
    const postList = async () => {
        const response = await fetch("http://localhost:3000/posts");

        setPostData(await response.json())
        
    }
  
    
    return (
        <div>
            <h1> Hello from timeline </h1>    
            <ol>

           
            {postData.map((data) => {
                return (
                    <li className = "postItem" key = {data.id}> {data.title} </li>
                )
            })}
            </ol>
            <a href = "/createpost"> Create a post </a>        
        </div>
    )
}


export default Timeline;