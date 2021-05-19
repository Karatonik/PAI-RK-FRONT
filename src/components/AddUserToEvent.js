import React, { Component } from 'react';

import {Card} from 'react-bootstrap'
import { Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';


export default class AddUserToEvent extends Component {



    handleSubmit=e=>{
        e.preventDefault();
        const email =localStorage.getItem('email');
        const eventID= this.props.match.params.id

      
        console.log("Email "+  email, "Event ID " +eventID)
      
        const config ={
          headers:{
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Expose-Headers': 'Authorization'
          },
         
         
      };
      const data = {
            email:this.email
      }
        axios.post('/api/event/addUser/'+data.email+'/'+eventID,config).then(
           res =>{
              

            this.setState({
               
                
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
            <div>
             <Card  style={{width:'400px',marginLeft:'40%',backgroundColor:'#D0FFC8',fontSize:'20px',marginTop:'12%'}}>    
                 <Icon  component= {WarningIcon} />
                 <Icon component= {WarningIcon} style={{marginLeft:"94%",marginTop:'-6%'}}/>
                      Email of user, which you  want to invite
                      
                    <div className = "form-group">
                  <input type = "email" className = "form-control" placeholder = "Email"
                  onChange={e=>this.email=e.target.value}/>
              </div>
                  <Button   onClick={this.handleSubmit} style ={{backgroundColor:'#007bff',margin:'7px'}}>
                                Yes
                  </Button>
                 <Icon component= {WarningIcon} style={{marginLeft:"94%"}} />
                 <Icon component= {WarningIcon} style={{marginTop:'-6%'}}/>
                 </Card>
       
          </div>
        );
    }
}

 