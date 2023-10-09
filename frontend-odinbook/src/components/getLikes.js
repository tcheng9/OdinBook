import React from "react";
import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import './css/get-likes.css'
//GET list of likes for a specific post

const GetLikes = ({postId}) => {
    const [fetchData, setFetchData] = useState([]);
    const [likesLength, setLikesLength] = useState(0);
    const [show, setShow] = useState(false);
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
                setLikesLength(data.likes.length);
             
                // console.log('likes data:');
                // if(data.likes.length != 0){
                //     console.log('andlkandsa')
                //     console.log(data.likes.length);
                // } else {
                //     continue;
                // }
                // console.log(data.likes);
            })
            
            
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        handleGetLikes();
    }, [])

    /////////////////////////////////////////////////////////
    //Add a  like functionality
    const navigate = useNavigate();

    const navigateTimeline = () => {
        navigate('/timeline');
    }

    const handleLike = (e) => {
        e.preventDefault();
        
        //NOTE: postId already exists so no need to get it

        //Getting userId
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.id;

        try{
            const fetchSettings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth-token': JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                })
            }
            
            console.log(userId);

            const postUrl = "http://localhost:4000/posts/" + postId + "/likes?userId=${userId}";
            
            fetch(postUrl, fetchSettings);
            
        } catch (err) {
            console.log(err);
        }
    }

    /////////////////////////////////////////////////////////
    //Unlike functionality

    const handleUnlike = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.id;

        try{
            const fetchSettings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth-token': JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({
                    userId: userId
                })
            }
            
            console.log(userId);

            const postUrl = "http://localhost:4000/posts/" + postId + "/unlike";
            console.log(postUrl);
            fetch(postUrl, fetchSettings);
            
        } catch (err) {
            console.log(err);
        }

        // window.location.reload(false);

    }


    //Testing how to show/hide a likes div that provides a list of all divs
    let showhidediv = document.getElementById('showhide');
    let display = 0;
   
    const showHideLikes = () => {
        
        if (display === 1){
            showhidediv.style.display = 'block';
            display = 0;
        } else {
            showhidediv.style.display = 'none';
            display = 1;
        }
    }

    const showOrHideAllLikes = () => {
        if (show === true){
            setShow(false);
        } else {
            setShow(true);
        }
    }

    return (
        
        
        <div>
             
            
               
                {/* <div id = "showhide">
                   

                    <ul> 
                                        
                                        <button> 
                                                
                                        </button>
                                        {
                                            
                                            fetchData.map((data, index) => {
                                                
                                                return (
                                                    <div>
                                                        <div key = {index}>
                                                            <div className = "commentItem" > Comment: {data}</div> 
                                                        
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    
                                                )
                                            })
                                            
                                        }
                                </ul>

                </div>
                 */}
                {show ? <div id = "showhide">
                   

                   <ul> 
                                       
                                       <button> 
                                               
                                       </button>
                                       {
                                           
                                           fetchData.map((data, index) => {
                                               
                                               return (
                                                   <div>
                                                       <div key = {index}>
                                                           <div className = "commentItem" > Comment: {data}</div> 
                                                       
                                                       </div>
                                                       
                                                   </div>
                                                   
                                                   
                                               )
                                           })
                                           
                                       }
                               </ul>

               </div> : null}

                <button onClick = {showOrHideAllLikes}> Show Likes </button>
                
            <button className = "likeButton" onClick = {handleLike}> Like the post </button> 
            <button className = "unlikeButton" onClick = {handleUnlike}> Unlike the post </button> 
            
        </div>
       


    )
}

export default GetLikes;