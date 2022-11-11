import React from 'react';
import {useEffect, useState} from 'react';

const Timeline = () => {

    const [postdata, setPostData] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/posts')
        .then((response) => {response.json()})
        .then((data) => {
            setPostData(data);
            console.log(postdata);
        })

        }, [])
    

  
    
    return (
        <div>
            <h1> Hello from timeline </h1>    

            <a href = "/createpost"> Create a post </a>        
        </div>
    )
}


export default Timeline;