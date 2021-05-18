import React, { Component } from 'react';
import axios from 'axios';

export default class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_file: null,
            image_preview: '',
        }
    }

    state={

    }
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_as_files: image_as_files,
        })
        
    }
    
    handleSubmit=()=>{
        if (this.state.image_as_files !== null){
        let formData = new FormData()
        formData.append('file', this.state.image_file);
        console.log(formData.getAll('data'))
        // const config ={
        //     headers:{
        //         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2b2xjaHVrckBnbWFpbC5jb20iLCJpYXQiOjE2MjEyOTUzOTUsImV4cCI6MTYyMTM4MTc5NX0.suwdiWWkFX1U9qTsux6hwXWQ7M_T6C8EywXBL-4JRA1O85GGI1P3GqJvv5oD0U8nQNxQRQkXSOFscjbZwD8PeQ',
        //          'Accept' : 'application/json',
        //         //  'content-type': 'multipart/form-data; boundary=',
        //         //  'Access-Control-Expose-Headers': 'Authorization',
        //     },
           
        // };
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
     
        const data ={
            file:formData
        }


      

        axios.post('http://localhost:8080/api/file/?email=romvol001@utp.edu.pl&typeOfImage=Avatar&eventId=1',formData,config).then(
           res =>{ 
               console.log(res) 
            if(res.data){
                alert('Avatar załadowany!')
            }
            this.setState({    
            });
            
               console.log(res.data)
            
           },
           
        ).catch(
            
            err=>{
                
            } 
        )  
   }
    }  

    
    render() {
        return (
            <div style={{marginTop:'12%'}}>
                {/* image preview */}
                <img src={this.state.image_preview} alt="image preview"/>

                {/* image input field */}
                <input
                    type="file"
                    name ='file'
                    onChange={this.handleImagePreview}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmit} value="Submit"/>
            </div>
        );
    }
}

