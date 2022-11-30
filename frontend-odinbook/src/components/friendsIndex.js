import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import jwt_decode from "jwt-decode";

const FriendsIndex = ({postId}) => {

  const [usersList, setUsersList] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const [numArray, setNumArray] = useState([0,1,2,3,4,5,6]);

  const userA = "638386a5de2e8f31c224b0fc"
  const userB = "638386aade2e8f31c224b0fe";

  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const userId = decoded.id;

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


  function getPending(){
    //Get pending friend requests for logged in user
    const requestOptions = {
        method: 'GET'
    }

    const url = "http://localhost:4000/friends/pending";
    

    fetch(url, requestOptions)
    .then((response => response.json()))
    .then((data) => {
        setPendingFriends(Object.values(data)[0]);
        // console.log(pendingFriends);
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
        setAcceptedFriends(Object.values(data)[0]);
        // console.log(acceptedFriends);
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

        {
           usersList.map((data) => {
            console.log(data.friends);
            // In this iteration, is this user's ID in friends array
            if (data.friends.indexOf("6e6f6e6520666f72206e6f77") > -1){
                console.log(data.friends)
                // return (
                //     // <div>
                //     // Friends condition
                //     // <h1> {data.username} </h1>
                //     // <p> True </p>
                //     // <p> ---------------------------------------------</p>

                //     // </div>
                // )
            }

            // In this iteration, is this user's ID in pending friend requests array
            if (data.pendingFriendRequests != "6e6f6e6520666f72206e6f77"){
              return (
                  <div>
                  Pending friend requests condiiton
                  <h1> {data.username} </h1>
                  <p> True </p>
                  <p> ---------------------------------------------</p>
                  
                  </div>
              )
          }
            // In this iteration, is this user's ID in friends/pendingFriendRequests array

            if (data.friends == userId || data.pendingFriendRequests == userId){
              return (
                  <div>

                  self match condition
                  </div>
              )
          }

          // In this iteration, the user and current user is not friend
          if (data.pendingFriendRequests != userId){
            return (
                <div>

                Not friends condition 
                <button> Add this user </button>
                </div>
            )
        }
            return (
                <div key = {data._id}> {data.username} </div>
            )
           })
        }
       

    
    </div>
  )
}

export default FriendsIndex;


// 
// {
//     numArray.map((data, index) => {
//         if (data < 5){
//             return (
//                 <div> 1</div>
//             )
//         } else {
//             return (
//                 <div> Greater than 5 </div>
//             )
//         }

//     })
// }