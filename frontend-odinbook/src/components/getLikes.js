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
                setFetchData(data);
                console.log('likes data:');
                console.log(data);
            })
            
            
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        handleGetLikes();
    }, [])

    return (
        <h1> People who have given likes: </h1>


    )
}

export default GetLikes;