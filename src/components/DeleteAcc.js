import React, { Component } from 'react';
import axios from 'axios';
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
        axios.get("/mail/delete/"+email)
        .then(res => {
            this.setState({ event: res.data });
            console.log(res)
            localStorage.clear();
            this.props.setUser(null);
        
            this.props.history.push("/");
        })
     
        .catch(error => {
   
            console.log(error)
            
        });
  


    }

    render() {
        return (       
            <form onSubmit={this.handleSubmit} style={{marginTop:'12%'}}> 
              <h3 style={{marginLeft:'45%'}}>Delete Account</h3>
              <button className = "btn btn-primary btn-block" style={{width:'300px',marginLeft:'42%'}}>Submit</button>
          </form>
        );
    }
}

export default DeleteAcc;