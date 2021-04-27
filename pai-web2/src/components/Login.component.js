import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {

    state={
        errorMessage: ''
    }
    handleSubmit=e=>{
        e.preventDefault();

        const data = {
            email:this.email,
            password:this.password
            
        }

        axios.post('http://localhost:8080/api/auth/singin/',data).then(
            res =>{
                 localStorage.setItem('token',res.data.token);             
                 localStorage.setItem('email',res.data.email);
                 console.log(res);
                this.setState({
                    loggedIn:true
                    
                });
                this.props.setUser(res.data.user);
               
                window.location.reload();

            }
        ).catch(err =>{
            this.setState({errorMessage: err.message})
        })
    };

    render() {

        if(this.state.loggedIn){
            return <Redirect to ={'/'}/>
        }
        
        return (
            <form onSubmit={this.handleSubmit}>
              {this.state.errorMessage && 
              <div class="message" style={{color:'red'}}>Error: Bad email or password!         

                </div>
              }



              <h3>Login</h3>

              <div className = "form-group">
                  <label>Email</label>
                  <input type = "email" className = "form-control" placeholder = "Email"
                  onChange={e=>this.email=e.target.value}/>
              </div>
              <div className = "form-group">
                  <label>Password</label>
                  <input type = "password" className = "form-control" placeholder = "Password"
                  onChange={e=>this.password=e.target.value}/>
              </div>
            <div className='formBtnL'>
              <button className = "btn btn-primary btn-block">Login</button>
              <button type="reset" className="btn btn-primary btn-block">Reset</button>
              <p className = "forgot-password text-right">
                    <Link to ={'/forgot'}>Forgot password?</Link>
              </p>
              </div>
          </form>
        );
    }
}

 