import axios from 'axios';
import React, { Component } from 'react';

export default class Registration extends Component {
    state={
        errorMessage: '',
        successMessage:''
    }
    handleSubmit=e=>{
        e.preventDefault();
        const data ={
            email:this.email,
            password:this.password,
            nick:this.nick,
    
          
           
        };
        axios.post('http://localhost:8080/api/auth/singup/',data).then(
           res =>{
      
            this.setState({
               
                 successMessage:"Success: You have been successfully registered!"
            })
           
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 1500);
               console.log(res)
               
           },
           
        ).catch(
            err=>{
               
                this.setState({errorMessage: err.message})
               
               
            }
            
        )
        
          
        
    }
    
    render() {
     
          
        
        return (
          <form onSubmit={this.handleSubmit} >
              {this.state.errorMessage && 
              <div class="message" style={{color:'red'}}>Error: Email is already taken!         

                </div>
              }
            
               
               { this.state.successMessage &&
            <div class="message" style={{color:'green'}}> Success: You have been successfully registered!        

            </div>
                 } 
              <h3>Sign Up</h3>

              <div className = "form-group">
                  <label>Email</label>
                  <input required autoComplete="off" type = "email" className = "form-control" placeholder = "Email"
                  onChange={e=>this.email=e.target.value}/>
              </div>
              <div className = "form-group">
                  <label>Password</label>
                  <input type = "password" required autoComplete="off" className = "form-control" placeholder = "Password"
                  onChange={e=>this.password=e.target.value}/>
              </div>
              <div className = "form-group">
                  <label>Nick</label>
                  <input type = "text" required autoComplete="off" className = "form-control" placeholder = "Nick"
                  onChange={e=>this.nick=e.target.value}/>
              </div>

              <button className = "btn btn-primary btn-block">Sign Up</button>
              <button type="reset" className="btn btn-primary btn-block">Reset</button>
          </form>
        );
    }
}

 