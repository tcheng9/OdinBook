import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import {useState} from "react";
import "./css/comment.css"
const Comment = ({postId}) => {

        const [fetchData, setFetchData] = useState([]);
        const [commentsLength, setCommentsLength] = useState(0);
        //Function to get all comments existing in the database
        const handleGetAllComments = () => {
            try{
                const fetchSettings = {
                    method: "GET",
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    
                }

                fetch(`http://localhost:4000/comments?postId=${postId}`, fetchSettings)
                .then(response => response.json())
                .then(data => {
                    setFetchData(data);
                    // console.log('comments:')
                    // console.log(data);
                    setCommentsLength(data.length);
                });


            } catch (err){
                console.log(err);
            }
    
        }

        //When page loads, it gets all comments and eisplays them accordingly 
        //-> based on corresponding postId
        useEffect(() => {
            handleGetAllComments();
        }, [])

        //Function to delete a selected comment by id
        function deleteComment(e){
            e.preventDefault();
            console.log(e.target.id);
            deleteCommentAPICall(e.target.id);
            window.location.reload(false);
        }

        //Fetch API call to delete selected comment

        const deleteCommentAPICall = async(commentId)=> {
            fetch('http://localhost:4000/comments/' + commentId, {
                method:'DELETE',
                // headers: {
                    //Need to add access token later
                // },
                body: JSON.stringify({
                    postId: commentId
                })
            })
        };

        //button to show/hide the list of all comments
      

        let showhidecommentsdiv = document.getElementById('testhideshow');
        
        let display = 0;
    
        
        const showHideComments = () => {

            if (display === 1){
                showhidecommentsdiv.style.display = 'block';
                display = 0;
            } else if (display === 0) {
                showhidecommentsdiv.style.display = 'none';
                display = 1;
            }
        }
    return (
        <div>
            {/* <h1>  Testing comnnection </h1>
            <h1> {postId} </h1>  */}
            
            <div>
                <div> Length of comments {commentsLength}</div>
                <h1> Comments: </h1>
               
                    
                <div id = "testhideshow">
                    <ol> 
                    {
                        fetchData.map((data, index) => {
                            return (
                                <div key = {data._id}>
                                    <li className = "commentItem"> {data.text}</li>
                                    <button onClick = {deleteComment} id = {data._id}>
                                        Delete this comment
                                    </button>
                                </div>
                            )
                        })
                        
                    }
                    </ol>
                </div>

                <button onClick = {showHideComments}> Show Comments </button>
            </div>
        </div>
    )
};

export default Comment