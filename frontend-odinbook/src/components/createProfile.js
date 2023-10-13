import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import jwt_decode from "jwt-decode";
import './css/createprofile.css';
const CreateProfile = () => {

    const testForm = new FormData();

    const [formData, setFormData] = useState({
        userId: '',
        age:'',
        gender: '',
        worstTravelExp: '',
        designTVShow:'',
        superpower: '',
        profileImage:'',
    })


    const [file,setFile] = useState([]);
    //Function to decode JWT and get userID
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userIdToken = decoded.id;


    //Handle changes in form data change
    function handlePost(e) {
        const newData = {...formData};
        newData[e.target.id] = e.target.value;
        newData["authorId"] = userIdToken;
        setFormData(newData);

        // console.log(newData);
    }

    function handleFile(e){
       
        const file = e.target.files[0];
        setFile(file);

        console.log(file);

        // const newData = {...formData};
        // newData[e.target.id] = e.target.files[0];
        // newData["authorId"] = userId;
        // setFormData(newData);

        // console.log(newData);
        // const files = Array.from(e.target.files)
        // console.log("files:", files[0])
        // console.log("files:", files[0].name)
    }


    
    function FormSubmit(e){
        e.preventDefault();
        //restFormData is getting data from the react JS form and then translating it into FormData() obj that can be used with Rest API
        const restFormData = new FormData();

        

        restFormData.append('userId', userIdToken);
        restFormData.append('age', formData.age);
        restFormData.append('gender', formData.gender);
        restFormData.append('worstTravelExp', formData.worstTravelExp);
        restFormData.append('designTVShow', formData.designTVShow);
        restFormData.append('superpower', formData.superpower);
       
        restFormData.append('file', file);
        


        

        const requestOptions = {
            method: 'POST',
            mode:"cors",
            body: restFormData,
            

        }

        const apiUrl = 'https://test-deploy-1.fly.dev/profile/create/' + userIdToken;

        fetch(apiUrl, requestOptions).then((response) => console.log('responding'))
        .then((data) => {
            console.log('data' + data)
       
        });
    }
    

    return (
        <div className = "createprofile-wrapper">
        
          
            <form id = "createpost" method = "post" encType = "multipart/form-data" className = "createprofile-form">
                {/* Unsure why is "createpost" -> fix later and test */}
                <h1> Create a profile </h1>

              
                <input onChange={(e) => handlePost(e)} value = {formData.age} type = "number" id = "age" name = "age" placeholder = "Age" />

               
                <input onChange={(e) => handlePost(e)} value = {formData.gender} type = "text" id = "gender" name = "gender" placeholder = "Gender" /> 


              
                <input onChange={(e) => handlePost(e)} value = {formData.worstTravelExp} type = "text" id = "worstTravelExp" name = "worstTravelExp" 
                    placeholder = "Worst travel experience?"
                /> 


                <input onChange={(e) => handlePost(e)} value = {formData.designTVShow} type = "text" id = "designTVShow" name = "designTVShow"
                    placeholder = "Design a TV show"
                />


                <input onChange={(e) => handlePost(e)} value = {formData.superpower} type = "text" id = "superpower" name = "superpower"
                    placeholde = "What super do you want?"
                />

                <input onChange={(e) => handleFile(e)} type = "file" id = "profileImage" name = "profileImage"
                    placeholder = "Profile Picture"
                />




                <button onClick = {FormSubmit}> Create Profile </button> 
            </form>
         
        
        {/* <img src = "http://localhost:3000/uploads/2022-11-24T14:02:08.399Ztree.jpeg"/> */}
        
        </div>
        
        
    )
}

export default CreateProfile;