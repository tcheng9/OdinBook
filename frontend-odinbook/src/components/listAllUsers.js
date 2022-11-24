/* This page will display all users SO any user can visit any user's profile page*/

import React from "react";


const DisplayUsers = () => {
// http://localhost:3000/profile

    const requestOptions = {
        method: 'GET',
    }

    fetch('http://localhost:3000/profile', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));

    return (
        <div>
            <h1> List of Users: </h1>
        </div>
    )
}

export default DisplayUsers;