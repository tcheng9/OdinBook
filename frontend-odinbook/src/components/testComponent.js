import React from "react";
import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'

//GET list of likes for a specific post

const TestDynamicRouting = ({postId}) => {

    let { id } = useParams(); 
   

    
    useEffect(() => {
        // console.log(match.params.id);
        // console.log(profileId);
        // console.log(this.props);
        console.log(id);
    })

    return (
        <div>
            test
            <h1>{id} </h1>
            sdf
        </div>
    )
}

export default TestDynamicRouting;