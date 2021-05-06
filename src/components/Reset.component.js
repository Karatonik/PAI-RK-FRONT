import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Reset extends Component {
    state ={};

    handleSubmit = e =>{
        e.preventDefault();

        const data ={
            key:this.props.match.params.id,
            password : this.password
        };

        console.log('http://localhost:8080/api/user/pwd/'+ data.key +"/"+data.password);


        axios.put('http://localhost:8080/api/user/pwd/'+ data.key +"/"+data.password).then(
            res =>{
                console.log(res);
                this.setState({
                    reset :true
                });
            }
        ).catch(
            err =>{
                this.setState({
                    message:err.response.data.message
                })
            }
        )
    };


    render() {
        let error='';
        if(this.state.message){
            error =(
                <div className = "aler aler-danger" role = "alert">
                    {this.state.message}
                </div>
            )
        }

        if(this.state.reset){
            return <Redirect to ={'/login'}/>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {error}
              <h3>Reset Password</h3>

              <div className = "form-group">
                  <label>New password</label>
                  <input type = "password" className = "form-control" placeholder = "Password"
                  onChange={e=>this.password=e.target.value}/>
              </div>

              <button className = "btn btn-primary btn-block">Submit</button>
          </form>
        );
    }
}

