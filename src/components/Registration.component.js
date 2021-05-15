import axios from 'axios';
import React, { Component } from 'react';
import MyToast from './MyToast';

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
            localStorage.setItem("status", JSON.stringify(res.data.activated));
            this.setState({    
                "show":true
                
            });
            setTimeout(()=>this.setState({"show":false}),3000);
            
            window.location.reload();
               console.log(res)
           },
           
        ).catch(
            err=>{
                this.setState({"show":false});
            }
            
        )
        
          
        
    }
    
    render() {
     
          
        
        return (
            <>
            <div style={{width:'100px',marginLeft:'80%',marginTop:'1%'}}>
            <MyToast/>
            </div>
              
           
          <form onSubmit={this.handleSubmit} >
           <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Projekt Deleted Successfully."}type={"danger"}/>
                </div>
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
          </>
        );
    }
}

 