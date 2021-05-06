import React, { Component } from 'react';
import {Card} from 'react-bootstrap'
import { Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';


export default class RequestUser extends Component {



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
        axios.post('http://localhost:8080/api/user/rtje/'+email+'/'+eventID,config).then(
           res =>{
                //  localStorage.setItem('eventID',res.data.eventID);
                localStorage.setItem('participationId',res.data.participationId);
                localStorage.setItem('request',res.data.request);
                console.log(" Id parti: ",localStorage.getItem('participationId'),"Request:",localStorage.getItem('request'));
      
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
             <Card  style={{width:'400px',margin:'10px',left:'500px',backgroundColor:'#D0FFC8',fontSize:'20px'}}>    
                 <Icon  component= {WarningIcon} />
                 <Icon component= {WarningIcon} style={{marginLeft:"94%",marginTop:'-6%'}}/>
                      Request to join event
                      <Button   onClick={this.handleSubmit} style ={{backgroundColor:'#007bff',margin:'7px'}}>
                                Yes
                                </Button>
                    
                    <Button onClick={this.close} variant = "outline-danger" style ={{backgroundColor:' #ff6666',margin:'7px'}}>
                      No
                    </Button >
                 <Icon component= {WarningIcon} style={{marginLeft:"94%"}} />
                 <Icon component= {WarningIcon} style={{marginTop:'-6%'}}/>
                 </Card>
       
          </div>
        );
    }
}

 