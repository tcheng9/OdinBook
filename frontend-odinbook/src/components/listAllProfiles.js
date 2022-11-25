/* This page will display all users SO any user can visit any user's profile page*/

import React from "react";
import {useState, useEffect} from "react";

const DisplayProfiles = () => {
// http://localhost:3000/profile
// Dynamic routing based on usernames for each individual profile
    const [users, setUsers] = useState([]);


    const handleGetProfiles = () => {
        const requestOptions = {
            method: 'GET',
        }


        fetch('http://localhost:3000/profile', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            });
    }

    useEffect(() => {
        handleGetProfiles();
    }, [])
    

    return (
        <div>
            <h1> List of Users: </h1>

            <ol>
                
                {
                    users.map((data) => {

                        const url = "http://localhost:3001/profiles/" + data.userId._id;

                        return (
                            <div key = {data._id}>
                                
                                <a href = {url}> {data.userId.username}</a>
                            </div>
                        )
                    })
                }
            </ol>

        </div>
    )
}

export default DisplayProfiles;