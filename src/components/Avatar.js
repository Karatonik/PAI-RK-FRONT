import React, { Component } from 'react';
import axios from 'axios';

export default class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_file: undefined,
            image_preview: '',
        }
    }

   
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        this.setState({
            image_preview: image_as_base64,
            image_file: e.target.files[0],
        })
    }
    
    handleSubmit=()=>{
        if (this.state.image_file !== null){
        let formData = new FormData()
        formData.append('file', this.state.image_file);
        console.log(formData.getAll('data'))
        const config ={
            headers:{
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2b2xjaHVrckBnbWFpbC5jb20iLCJpYXQiOjE2MjEzMjk2NjksImV4cCI6MTYyMTQxNjA2OX0.483rl3a0Dh4ShMgxz-NxoEzyNjk4ce4YckDUZoSaf_hTzyfncuDtklQbYeEfn1GLkq5tVB0ShPvz1zN9Y1QosA',
                 'Accept' : 'application/json',
                  'Access-Control-Expose-Headers': 'Authorization',
            },
           
        }; 

        let email = localStorage.getItem("email");

        axios.post('http://localhost:8080/api/file/?email='+email+'&typeOfImage=Avatar&eventId=1',formData, config).then(
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
                <img src={this.state.image_preview} alt="Preview "/>

                <input
                    type="file"
                    name ='file'
                    accept="image/*"
                    onChange={e => this.handleImagePreview(e)}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmit} value="Submit"/>
            </div>
        );
    }
}

