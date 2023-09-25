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
 ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Get current user's id to send to mongo db
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.id;

    //On page load, run these functions within useEffect
    useEffect(()=> {
        getAllUsers();
    }, [])
///////////////////////////////////////////////////////////////////////////////////////////////////
    
    //API call to send a pending friend request
    const sendPendingRequest = (userId, targetId) => {
        const url = "http://localhost:4000/friends/pending/" + userId + "/" + targetId
        const fetchSettings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, fetchSettings);
    }

    //button handler for sending pending friend request
    const handlePendingRequest = (e) => {
        e.preventDefault();
        
        sendPendingRequest(userId, e.target.id);
        console.log(userId + '|||||' + e.target.id);
        console.log('sent pending friend request')
    }

    
///////////////////////////////////////////////////////////////////////////////////////////////////
    //API call to accept a friend request
    const acceptFriendRequest = (userId, targetId) => {
        const url = "http://localhost:4000/friends/accepted/" + userId + "/" + targetId
        const fetchSettings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, fetchSettings);
    }
    //button handler for sending pending friend request
    const handleAcceptingFriendRequest = (e) => {
        e.preventDefault();
        
        acceptFriendRequest(userId, e.target.id);
        console.log(userId + '|||||' + e.target.id);
        console.log('sent accepting friend request')
    }


///////////////////////////////////////////////////////////////////////////////////////////////////
    //API call to unfriend a person
    const unfriendingFunction = (userId, targetId) => {
        const url = "http://localhost:4000/friends/delete/" + userId + "/" + targetId
        const fetchSettings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, fetchSettings);
    }

    

    //button handler for sending pending friend request
    const handleUnfriending = (e) => {
        e.preventDefault();
        
        unfriendingFunction(userId, e.target.id);
        console.log(userId + '|||||' + e.target.id);
        console.log('unfriending request')
        
    }
/*
Thoughts:
1. current user is stored locally so you can retrieve that easily
2. For target id/person you want to friend, it's store in the div id SO you have to get the e.target.id each call 
-> easy to do as well
3. Question: How to pass into API call?
3a. ANSWER: 

*/

///////////////////////////////////////////////////////////////////////////////////////////////////
    return(
        <div>
            
            {
            usersList.map((data) => {
                
                let val1;
                let val2;
                // if (data.pendingFriendRequests.length != 0){
                //     // val1 = data.pendingFriendRequests[0].senderCheck
                //     val2 = data.pendingFriendRequests[0].senderId
                //     // console.log(data.pendingFriendRequests[0].senderCheck)
                //     console.log(data.pendingFriendRequests[0].senderId)
                // // }
                // console.log(data['pendingFriendRequests']);
                //////////////////////////
                // if (data.pendingFriendRequests[0].senderCheck === undefined){
                //     // console.log(data.pendingFriendRequests[0].senderCheck)
                //     console.log(data);
                // }

                //////////////////////////////////
                // if (data.pendingFriendRequests[0].senderCheck && data.pendingFriendRequests[0].senderCheck === true){
                //     val1 = "true"
                // } else {
                //     val1 = "false"
                // }

                
                if (data['pendingFriendRequests'].length > 0){
                    console.log(data['pendingFriendRequests'][0].senderCheck)
                    if (data['pendingFriendRequests'][0].senderCheck === true){
                        val1 = "true"
                    } else {
                        val1 = "false";
                    }
                
                }

               return (
                <div>
                    {data.username}
                    <br/>
                    {data._id} 
                    <br/>
                    <div>
                        Potential data here: <br/>
                        {val1}

                        <br/> 
                        {val2}
                    </div>
                    <button onClick = {handlePendingRequest} id = {data._id}> Add Friend </button>
                    <button onClick = {handleAcceptingFriendRequest} id = {data._id}> Accept friend request </button>
                    <button onClick = {handleUnfriending} id = {data._id}> Unfriend </button>
                    ------------------------------------------
                </div>
               )
            })

            }
        </div>
            
    
    )
}

export default FriendsManagement;


