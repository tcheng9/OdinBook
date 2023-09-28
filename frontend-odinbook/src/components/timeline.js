import React from 'react';
import {useEffect, useState} from 'react';
import "./css/timeline.css";
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
        const response = await fetch("http://localhost:4000/posts");
        setPostData(await response.json());
    }
  
    //function to delete
    function deletePost(e){
        e.preventDefault();
       
        deletePostAPICall(e.target.id);
        console.log('post deleted');
        window.location.reload(false);
    }
    
    //Fetch call to delete a post by postId
    const deletePostAPICall = async(postId)=> {
        fetch('http://localhost:4000/posts/' + postId, {
            method:'DELETE',
            // headers: {
                //Need to add access token later
            // },
            body: JSON.stringify({
                postId: postId
            })
        })
    };

    return (
        
        <div>

            
            <header className = "timeline-header">

                    <div className = "header-wrapper">
                        Logo
                    </div>
                    
                    <div className = "header-wrapper">
                        <a href = "/createpost"> <p> Create a post </p> </a> 

                    

                   
                        <a href = "/createprofile"> <p> Create a profile </p> </a>  
                    
                
                    
                        <a href = "/profiles"> <p> View all profiles </p> </a>   
                   

                    
                        <a href = "/friendsmanagement"> <p> Friends management page </p> </a>  
                   
                    </div>
                        
                 
               
            </header>
           

            
            <div className = "all-post-wrapper">

            
           {/* Mapping through post data and displaying each individual post */}
            {postData.map((data) => {
                return (
                    <div key = {data._id} className = "single-post-wrapper">
                        <div className = "post-header-wrapper">
                            
                            <h1 className = "post-title"> TITLE: {data.title}</h1>
                        
                            <div className = "header-child-wrapper">
                                    <p> (PLACEHOLDER) this will display time </p>
                                <button onClick = {deletePost} id = {data._id}>
                                    Delete this post
                                </button>
                            </div>
                            
                        </div>
                        
                        <div className = "post-content">
                            POST CONTENT {data.message}
                        </div>

                      
                        <div className = "post-buttons">
                                -------------BUTTONS GO HERE ------------
                        </div>    

                        <div className = "create-comment">
                            <CreateComment postId = {data._id}/>
                        </div>
                        
                        <div className = "comments">
                            <Comment postId = {data._id} />
                        </div>
                        
                  
                        <GetLikes postId = {data._id} />
                        
                    </div>
                    
                )
            })}
             
            </div>
        
            
        </div>
    )
}


export default Timeline;