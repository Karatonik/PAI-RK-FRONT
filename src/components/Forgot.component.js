import axios from 'axios';
import React, { Component } from 'react';

export default class Forgot extends Component {
    state ={
    errorMessage: '',
    successMessage:''
};
    handleSubmit = e =>{
        e.preventDefault();
        
        const data ={
            email:this.email
        }
        

       
        
        axios.get('https://pai-event.herokuapp.com/api/mail/reset/'+data.email).then(
            res =>{
                this.setState({
                    successMessage:"Success: You have been successfully reseted!"
                })
                console.log(res)
            }
        ).catch(
            err =>{
                this.setState({errorMessage: err.message})
            }
        )
    };

    render() {
        
        return (
            <form onSubmit={this.handleSubmit}>
                 {this.state.errorMessage && 
              <div class="message" style={{color:'red'}}>Error: Bad email!         

                </div>
              }
              <h3>Forgot Password</h3>

              <div className = "form-group">
                  <label>Email</label>
                  <input type = "email" className = "form-control" placeholder = "Email"
                  onChange={e=>this.email=e.target.value}/>
              </div>

              <button className = "btn btn-primary btn-block">Submit</button>
          </form>
        );
    }
}

