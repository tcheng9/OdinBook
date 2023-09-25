import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import jwt_decode from "jwt-decode";

const FriendsManagement = () => {
    
    const [usersList, setUsersList] = useState([]);

    function getAllUsers(){
        //Get all users listed in User's model in the datbase
        const requestOptions = {
            method: 'GET'
        }
    
        const url = "http://localhost:4000/auth";
    
        fetch(url, requestOptions)
        .then((response => response.json()))
        .then((data) => {
            setUsersList(Object.values(data)[0]);
                
            // console.log('data');
            // console.log(data);
            // console.log('usersList');
            // console.log(usersList);
        })
        
    }

    useEffect(()=> {
        getAllUsers();
    }, [])

  
    return(
        <div>
            {
            usersList.map((data) => {
                
               return (
                <div>
                    {data.username}
                    <br/>
                    {data._id}
                    <br/>
                    ------------------------------------------
                    <button> Add Friend </button>
                    <button> Unfriend </button>
                </div>
               )
            })

            }
        </div>
            
    
    )
}

export default FriendsManagement;


