import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import {useState} from "react";

const Comment = ({postId}) => {

        const [fetchData, setFetchData] = useState([]);

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
                    console.log('comments:')
                    console.log(data);

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


    return (
        <div>
            {/* <h1>  Testing comnnection </h1>
            <h1> {postId} </h1>  */}
            
            <div>
                <h1> Comments: </h1>
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
        </div>
    )
};

export default Comment