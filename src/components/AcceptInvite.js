import React, { Component } from 'react';
import {Card} from 'react-bootstrap'
import { Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';


export default class AccepsInvite extends Component {



    handleSubmit=e=>{
        e.preventDefault();
        const email =localStorage.getItem('email');
        const participationId= this.props.match.params.id
        
        
      
        console.log("Email "+  email,  " Parti: "+ participationId)
      
        const config ={
          headers:{
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Expose-Headers': 'Authorization'
          },
         
         
      };
    
        axios.put('/user/accept/'+participationId+'/'+email,config).then(
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
             <Card  style={{width:'400px',backgroundColor:'#D0FFC8',left:'750px',fontSize:'20px',marginTop:'12%'}}>    
                 <Icon  component= {WarningIcon} />
                 <Icon component= {WarningIcon} style={{marginLeft:"94%",marginTop:'-6%'}}/>
                      Request to join event
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

 