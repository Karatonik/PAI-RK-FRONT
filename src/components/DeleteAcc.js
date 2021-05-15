import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import {Card} from 'react-bootstrap'
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteAcc extends Component {
    constructor(props){
        super(props);
        this.state = {
          user: [],
   
      }
    }
    
    handleSubmit = e =>{
        e.preventDefault();
        
    
        
        const email = localStorage.getItem('email')
        axios.get("http://localhost:8080/api/mail/delete/"+email)
        .then(res => {
            this.setState({ event: res.data });
            console.log(res)
           
        })
     
        .catch(error => {
            console.log(error)
        });
  


    }



    render() {
        
        const {user} =this.state;
        return (
                   
            <form onSubmit={this.handleSubmit}>
              
              <h3 style={{marginLeft:'45%'}}>Delete Account</h3>

              

              <button className = "btn btn-primary btn-block" style={{width:'300px',marginLeft:'42%'}}>Submit</button>
          </form>
        );
    }
}

export default DeleteAcc;