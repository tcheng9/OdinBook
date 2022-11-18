import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import {useState} from "react";

const Comment = ({postId}) => {

        const [fetchData, setFetchData] = useState([]);

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

        useEffect(() => {
            handleGetAllComments();
        }, [])

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