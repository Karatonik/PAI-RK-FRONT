import React, { Component } from 'react';
import {Card,Form,Col,Button} from 'react-bootstrap'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';



export default class AddEvents extends Component {
    
    state={}
    handleSubmit=e=>{
        e.preventDefault();
        const email =localStorage.getItem('email');
        
        console.log(email)
        const data ={
            eventID:this.eventID,
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
            localStorage.setItem('eventID',JSON.stringify(res.data.eventID));
            const eventID = JSON.parse(localStorage.getItem('eventID'))
            console.log(eventID);
          
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
       
        return (
            <Card style={{backgroundColor:'#D0FFC8',marginTop:'12%'}} >
            <Card.Header><Icon component= {AddBoxIcon} style={{marginLeft:'-90%'}}/>Create your Event!</Card.Header>  
               <Form onSubmit={this.handleSubmit}>
                    <Card.Body >
                    <Form.Row>
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
                                <Form.Group as={Col} >
                                <Form.Label style={{position:'fixed'}}>Access</Form.Label>
                                    <select style={{marginTop:'12%',width:'200px',height:'38px'}} 
                                    onChange={e=>this.access=e.target.value} 
                                     name = "access">
                                            <option value="select">Select access</option>
                                            <option value="Open">Open</option>
                                            <option value="Closed">Closed</option>
                                    </select>
                                    </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>Date Of Start Event</Form.Label>{' '}
                                    <TextField style={{marginTop:"0.5%",marginLeft:"1%"}}
                                     placeholder="Date Of Start Event"
                                        name = "dateOfStartEvent"
                                        type ='datetime-local'
                                        onChange={e=>this.dateOfStartEvent=e.target.value.toString().replace("T", " ")}
                                        value={this.state.dateOfStartEvent}
                                      />
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

 