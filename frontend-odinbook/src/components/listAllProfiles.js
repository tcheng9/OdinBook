/* This page will display all users SO any user can visit any user's profile page*/

import React from "react";
import {useState, useEffect} from "react";

const DisplayProfiles = () => {
// http://localhost:3000/profile

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
                        return (
                            <div key = {data._id}>
                                <div> profile user name: </div>
                                <li> {data.userId.username}</li>
                            </div>
                        )
                    })
                }
            </ol>

        </div>
    )
}

export default DisplayProfiles;