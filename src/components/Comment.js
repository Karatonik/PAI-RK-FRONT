import React from 'react';
import {Form,Col,Button} from 'react-bootstrap'

import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import axios from 'axios'

export default  class Comment extends React.Component {
  state={}
  handleSubmit=e=>{
      e.preventDefault();
      const email =localStorage.getItem('email');
      const eventId = localStorage.getItem('eventID');    
      console.log(eventId);
      const data ={
         text:this.text
        
         
      };
      const config ={
          headers:{
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Expose-Headers': 'Authorization'
          },
         
      };
       axios.post('/api/comm/'+email+'/'+eventId,data,config)
     
  
      .then(
         res =>{
          this.setState({
              message:res.data.message,
              cls:'success'
          })
             
             console.log(res)
             
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
      <Form onSubmit={this.handleSubmit}>
          <Form.Group  as={Col}>
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "text"
                                        onChange={e=>this.text=e.target.value}
                                        placeholder="Text" />
                                </Form.Group>
                                <Button style={{ marginRight: '6px' }} size="sm" className="buttonW" variant ="success" type = "submit" onSubmit={this.handleSubmit}><Icon component= {SaveIcon}/>Save</Button>
      </Form>
    );
  }
}

