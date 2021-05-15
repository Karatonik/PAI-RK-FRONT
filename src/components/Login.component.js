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
               
                // var activated = localStorage.getItem('activated');
                 localStorage.setItem('token',res.data.token);             
                 localStorage.setItem('email',res.data.email);
                 console.log(localStorage.getItem('activated'))
                 console.log(res);
                //  if(activated===('true')){
                this.setState({
                    loggedIn:true
                    
                });
                this.props.setUser(res.data.user);
               
                window.location.reload();
            // }else{
            //     alert('Konto jeszcze nie zostało aktywowane!Sprawdź swoją skrzyńkę pocztową!');
            // }

            }
        ).catch(err =>{
            alert('Email or password is incorrect!');
            window.location.reload();
        })
    };

    render() {
        if(this.state.loggedIn){
            return <Redirect to ={'/'}/>
        }
        return (
            <form onSubmit={this.handleSubmit}>
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

 