import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';

function FriendsIndex(){

  const [usersList, setUsersList] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const [numArray, setNumArray] = useState([0,1,2,3,4,5,6]);

  function getAllUsers(){
    //Get all users listed in User's model in the datbase
    const requestOptions = {
        method: 'GET'
    }

    const url = "http://localhost:4000/auth";

    fetch(url, requestOptions)
    .then((response => response.json()))
    .then((data) => {
        setUsersList(data);
        console.log(data);
    })
    
  }


  function getPending(){
    //Get pending friend requests for logged in user
    const requestOptions = {
        method: 'GET'
    }

    const url = "http://localhost:4000/friends/pending";
    

    fetch(url, requestOptions)
    .then((response => response.json()))
    .then((data) => {
        setUsersList(data);
        console.log(data);
    })
  } 

  function getAccepted(){
    //Get all accepted friend requests for logged in users
    const requestOptions = {
        method: 'GET'
    }

    const url = "http://localhost:4000/friends/accepted";

    fetch(url, requestOptions)
    .then((response => response.json()))
    .then((data) => {
        setUsersList(data);
        console.log(data);
    })

  }
  
  useEffect(() => {
    getAllUsers();
    getPending();
    getAccepted();
  }, [])

  return (
    <div>
        <a href = "http://localhost:3000/auth/facebook"> Facebook Login </a>
{/* 
        {
            numArray.map((data, index) => {
                if (data < 5){
                    return (
                        <div> 1</div>
                    )
                } else {
                    return (
                        <div> Greater than 5 </div>
                    )
                }

            })
        } */}

    
    </div>
  )
}

export default FriendsIndex;