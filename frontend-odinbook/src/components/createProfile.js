import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import jwt_decode from "jwt-decode";

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
    const userId = decoded.id;


    //Handle changes in form data change
    function handlePost(e) {
        const newData = {...formData};
        newData[e.target.id] = e.target.value;
        newData["authorId"] = userId;
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

    function testHandleFile(e){
        const files = e.target.files;

        testForm.append('myFile', files[0]);
    }

    function formSubmit(e){
        e.preventDefault();
     
        let finalData = new FormData(formData)
        

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: finalData,

        }

        const apiUrl = 'http://localhost:4000/profile/create/' + userId;


        fetch(apiUrl, requestOptions)
        .then((response) => console.log(response));
        // fetch(apiUrl, requestOptions)
        // .then((response) => response.json())
        // .then((data) => {
        // console.log(data)
       
        // });
    }


    function testFormSubmit(e){
        e.preventDefault();
        const testFormData = new FormData();

        
        
        testFormData.append('userId', 'placeholder');
        testFormData.append('age', formData.age);
        testFormData.append('gender', formData.gender);
        testFormData.append('worstTravelExp', formData.worstTravelExp);
        testFormData.append('designTVShow', formData.designTVShow);
        testFormData.append('superpower', formData.superpower);
        // testFormData.append('file', 'placeholder');
        testFormData.append('file', file);
        


        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            mode:"cors",
            body: testFormData,
            

        }

        const apiUrl = 'http://localhost:4000/profile/create';

        fetch(apiUrl, requestOptions).then((response) => console.log('responding'))
        .then((data) => {
            console.log('data' + data)
       
        });
    }
    

    return (
        <div>
            <h1> Create profile page </h1>
          <div>
            <form id = "createpost" method = "post" encType = "multipart/form-data">
                <h1> Create a profile </h1>

                <label htmlFor = "age"> Profile age</label> <br/>
                <input onChange={(e) => handlePost(e)} value = {formData.age} type = "number" id = "age" name = "age"/> <br/>

                <label htmlFor = "gender"> gender</label> <br/>
                <input onChange={(e) => handlePost(e)} value = {formData.gender} type = "text" id = "gender" name = "gender"/> <br/>


                <label htmlFor = "worstTravelExp"> Worst travel experience?</label> <br/>
                <input onChange={(e) => handlePost(e)} value = {formData.worstTravelExp} type = "text" id = "worstTravelExp" name = "worstTravelExp"/> <br/>


                <label htmlFor = "designTVShow"> Design a TV show  </label> <br/>
                <input onChange={(e) => handlePost(e)} value = {formData.designTVShow} type = "text" id = "designTVShow" name = "designTVShow"/> <br/>


                <label htmlFor = "superpower"> What super do you want?</label> <br/>
                <input onChange={(e) => handlePost(e)} value = {formData.superpower} type = "text" id = "superpower" name = "superpower"/> <br/>

                <label htmlFor = "profileImage"> Profile Picture </label> <br/>
                <input onChange={(e) => handleFile(e)} type = "file" id = "profileImage" name = "profileImage"/> <br/>




                <button onClick = {testFormSubmit}> Create Profile </button> 
            </form>
         </div>
        </div>
        
        
    )
}

export default CreateProfile;