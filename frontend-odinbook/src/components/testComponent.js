import React from "react";
import {useState, useEffect, useParams} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import { useSearchParams } from "react-router-dom";


//GET list of likes for a specific post

const TestDynamicRouting = ({postId}) => {

    

    
    useEffect(() => {
        // console.log(match.params.id);
        // console.log(props.profileID);
    })

    return (
        <div>
            test
            
        </div>
    )
}

export default TestDynamicRouting;