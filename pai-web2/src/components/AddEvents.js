import React, { Component } from 'react';
import {Card,Form,Col,Button} from 'react-bootstrap'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import axios from 'axios'

export default class AddEvents extends Component {
    state={}
    handleSubmit=e=>{
        e.preventDefault();
        const email =localStorage.getItem('email');
        console.log(email)
        const data ={
         
            name:this.name,
            province:this.province,
            city:this.city,
            address:this.address,
            access:this.access,
            dateOfStartEvent:this.dateOfStartEvent,
            
    
          
           
        };
        
      
        const config ={
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Expose-Headers': 'Authorization'
            },
           
        };
         axios.post('http://localhost:8080/api/event/'+data.name+'/'+data.province+'/'+data.city+'/'+data.address+'/'+data.access+'/'+data.dateOfStartEvent+'/'+email,config)
       
    
        .then(
           res =>{
            localStorage.setItem('eventID',res.data.eventID);
            console.log(localStorage.getItem('eventID'));
          
            this.setState({
                 
                
                message:res.data.message,
                cls:'success'
            });
           
               console.log(res)
            //    window.location.reload();
           } 
           
        ).catch(
            err=>{
                this.setState({
                   
                    cls:'danger'
                })
            }
            
        )
        
        
        
    }
 

    render() {
      
        let error ='';
        if(this.state.message){
            error =(
                <div className = "alert alert-success" role = "alert">
                    {this.state.message}
                </div>
            )
        }
        return (
            <Card style={{backgroundColor:'#D0FFC8'}}  >
            <Card.Header><Icon component= {AddBoxIcon} style={{marginLeft:'-90%'}}/>Create your Event!</Card.Header>  
               <Form onSubmit={this.handleSubmit}>
                    <Card.Body >
                    {error}
                    <Form.Row>
                    {/* <Form.Group  as={Col}>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "eventID"
                                        onChange={e=>this.eventID=e.target.value}
                                        placeholder="eventID" />
                                </Form.Group> */}
                        <Form.Group  as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "name"
                                        onChange={e=>this.name=e.target.value}
                                        placeholder="Name" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "province"
                                        onChange={e=>this.province=e.target.value}
                                        placeholder="Province"/>
                                </Form.Group>
                                <Form.Group  as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "city"
                                        onChange={e=>this.city=e.target.value}
                                        placeholder="City"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "address"
                                        onChange={e=>this.address=e.target.value}
                                        placeholder="Address"/>
                                </Form.Group>
                                <Form.Group  as={Col}>
                                    <Form.Label>Access</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "access"
                                        onChange={e=>this.access=e.target.value}
                                        placeholder="Access"/>
                                </Form.Group>
                                <Form.Group  as={Col}>
                                    <Form.Label>Date Of Start Event</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        name = "dateOfStartEvent"
                                        onChange={e=>this.dateOfStartEvent=e.target.value}
                                        placeholder="Date Of Start Event"/>
                                </Form.Group>

                            <Button style={{ marginRight: '6px' }} size="sm" className="buttonW" variant ="success" type = "submit" onSubmit={this.handleSubmit}><Icon component= {SaveIcon}/>Save</Button>
                             {' '}
                             <Button size="sm" className="buttonW"  variant ="info" type = "reset"><Icon component= {RestoreFromTrashIcon}/>Reset</Button>
                             {' '}
                         </Form.Row>         
                     </Card.Body>

            </Form>
        </Card>
        );
    }
}

 