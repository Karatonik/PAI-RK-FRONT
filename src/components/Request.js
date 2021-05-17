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
        var access =  '';
        axios.get('https://pai-event.herokuapp.com/api/event/'+eventID,config).then(
            
            res =>{
                access=res.data.access;
                this.setState({

                })
                console.log(res)
            },
        ).catch(
            err=>{
            
                this.setState({errorMessage: err.message})
               
               
            }
            
        )
        
          
        
      

        axios.post('https://pai-event.herokuapp.com/api/user/rtje/'+email+'/'+eventID,config).then(
           res =>{
                //  localStorage.setItem('eventID',res.data.eventID);
                // localStorage.setItem('participationId',res.data.participationId);
                // localStorage.setItem('request',res.data.request);
                // console.log(" Id parti: ",localStorage.getItem('participationId'),"Request:",localStorage.getItem('request'));
            if(access==='Open'){
              
                return this.props.history.push("/infoComments/"+eventID);
            }else{
                return this.props.history.push("/events");
            }
            this.setState({
               
                
            })
           
            
        
           
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

 