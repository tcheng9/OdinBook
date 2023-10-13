import React from 'react';
import {useEffect, useState} from 'react';
import "./css/timeline.css";
import CreateComment from './createComment';
import Comment from "./comment";
import CreateLike from "./createLike";
import GetLikes from "./getLikes";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
const Timeline = () => {

    
    const [postData, setPostData] = useState([]);

    const [comment, setComment] = useState({
        comment: '',
    });

    const [postId, setPostId] = useState('');


    //Getting userId
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.id;



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

    //Writing navigate buttons for headers
    const navigate = useNavigate();

    const navigateCreatePost = () => {
        navigate('/createpost')
    }

    const navigateCreateProfile = () => {
        navigate('/createprofile');
    }

    const navigateProfiles = () => {
        navigate('/profiles');

    }

    const navigateFriendsManagement = () => {
        navigate('/friendsmanagement');
    }


    const navigateCurrentUserProfile = () => {
        navigate('/profiles/' + userId);
    }
    

    return (
        
        <div>

            
            <header className = "timeline-header">

                    <div className = "header-wrapper">
                        OdinBook
                    </div>
                    
                    <div className = "header-wrapper">

                        <button className = "timeline-header-btn" onClick = {navigateCreatePost}>
                            Create Post
                        </button>

                        <button className = "timeline-header-btn" onClick = {navigateCreateProfile}>
                            Create Profile Info
                        </button>

                        {/* <button className = "profiles-router-btn" onClick = {navigateProfiles}>
                            
                        </button> */}

                        <button className = "timeline-header-btn" onClick = {navigateFriendsManagement}>
                            Friends List
                        </button>

                        <button className = "timeline-header-btn" onClick = {navigateCurrentUserProfile}>
                            My profile
                        </button>

                    </div>
                        
                 
               
            </header>
           
            {/* <div>
                Current user id - remove later: {userId}
            </div>
             */}
            <div className = "all-post-wrapper">

            
           {/* Mapping through post data and displaying each individual post */}
            {postData.map((data) => {
                return (
                    <div key = {data._id} className = "single-post-wrapper">
                        <div className = "post-header-wrapper">
                            {/* post title should actually be username but don't have time to resolve atm */}
                            <h1 className = "post-title"> Post Title: {data.title} </h1>

                            <div className = "header-child-wrapper">
                                    <p> {data.timestamp} </p>
                                <button className = "delete-post-btn" onClick = {deletePost} id = {data._id}>
                                    Delete this post
                                </button>
                            </div>
                            
                        </div>
                        
                        <div className = "post-content">
                            POST CONTENT {data.message}
                        </div>

                    <div className = "create-comment">
                        <CreateComment className = "test1" postId = {data._id}/>
                    </div>
                      <div className = "components-wrapper">
                            
                            
                            <div className = "comments-div">
                                <Comment postId = {data._id} />
                            </div>
                            
                            <div className = "likes-div">
                                <GetLikes postId = {data._id} />
                            </div>
                        
                        </div>
                        
                    </div>
                    
                )
            })}
             
            </div>
        
            
        </div>
    )
}


export default Timeline;