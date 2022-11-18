import React from "react";
import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

//GET list of likes for a specific post

const GetLikes = ({postId}) => {
    const [fetchData, setFetchData] = useState([]);


    const handleGetLikes = () => {
        console.log('handle likes');

        try {
            const fetchSettings = {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            }

            const postUrl = "http://localhost:4000/posts/" + postId + "/likes?userId=${userId}";

            fetch(postUrl, fetchSettings)
            .then(response => response.json())
            .then(data => {
                setFetchData(data.likes);
                // console.log('likes data:');
                // // console.log(data.likes);
                // console.log(data.likes);
            })
            
            
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        handleGetLikes();
    }, [])

    return (
        <div>
             <h1> People who have given likes: </h1>

            
            <ol> 
                    {
                        fetchData.map((data, index) => {
                            return (
                                <div key = {index}>
                                    <li className = "commentItem" > {data}</li>
                                </div>
                            )
                        })
                        
                    }
            </ol>
            
        </div>
       


    )
}

export default GetLikes;