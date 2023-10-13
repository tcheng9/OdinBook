import React from "react";
import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'

//GET list of likes for a specific post

const DynamicProfiles = ({postId}) => {
// Dynamic profiles. Not dynamic routing
    let { id } = useParams(); 
   
    const [profileInfo, setProfileInfo] = useState([]);


    const handleGetProfiles = () => {
        const requestOptions = {
            method: 'GET',
        }

        const fetchUrl = 'https://test-deploy-1.fly.dev/profile/create/' + id;

        fetch(fetchUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setProfileInfo(data);
                console.log(data);
            });
    }

    useEffect(() => {
        handleGetProfiles();
    }, [])
    

    return (
        <div>
            test
            <h1>{id} </h1>
            sdf

            <div>
                <ol>
                    {
                        profileInfo.map((data) => {
                            
                            const imgUrl = 'https://test-deploy-1.fly.dev/' + data.profileImage

                            return(
                                <div key ={data._id}>
                                    <li> {data.age}</li>
                                    <li> {data.designTVShow}</li>
                                    <li> {data.gender}</li>
                                    <li> {data.superpower}</li>
                                    <li> {data.worstTravelExp}</li>
                                    <img src = {imgUrl} />
                                </div>
                            )
                        }
                    )}
                        
                        
                    
                    
                </ol>
            </div>
        </div>
    )
}

export default DynamicProfiles;

