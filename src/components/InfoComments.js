import React, { Component } from 'react'
import axios from 'axios';
import {Card,Form,Col,Button,ButtonGroup} from 'react-bootstrap'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {MDBCardImage } from 'mdb-react-ui-kit';
export default class InfoComments extends Component {
  constructor(props){
    super(props);
    this.state = {
      event: {},
      comments:[],
      updateComm:[],
  }
}

  
componentDidMount =()=> {


  const eventID= this.props.match.params.id
  axios.get("/event/"+eventID)
      .then(res => {
          this.setState({ event: res.data });
          console.log(res)
          
      })
   
      .catch(error => {

          console.log(error)
      });

    // comments   
    const config ={
      headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': 'Authorization'
      },
     
  };

      
      axios.get("/event/comments/"+eventID,config).then(
      res => {
       
        console.log(res)
        this.setState({ comments: res.data });
    
          console.log("EventID: ",eventID)
          console.log("All comments: ",res)
          
          
      })
   
      .catch(error => {

          console.log(error)
      });



    
}



handleSubmit=e=>{
  e.preventDefault();
  const email =localStorage.getItem('email');


  console.log(email)

  const config ={
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Authorization',
       
    },
   
};
const data ={
  text:this.text
}

const eventID= this.props.match.params.id
console.log("Current eventID for comm: ",eventID)
  axios.post('/comm/'+email+'/'+eventID+'/'+data.text,config).then(
     res =>{
         
      this.setState({
      
      })
      console.log(res)
          
      
         window.location.reload();
      
         console.log(res)
       
     },
     
  ).catch(
      err=>{  

          this.setState({errorMessage: err.message})
         
         
      }
      
  )

  
}


deleteComment=(commentId)=>{ 
  let email = localStorage.getItem('email')
  axios.delete("/comm/"+commentId+"/"+email)
  .then(res=>{
      if(res.data){
          this.setState({
              comments:this.state.comments.filter(comment => comment.commentId !== commentId)

          });
          console.log(res)
      }
      else{
     
       alert('Its not your comment!')
       
      }
  });
};
setComments = comments =>{
  this.setState({
    comments:comments
  });
};


render() {
  const {event,comments} =this.state;



  return (
 <div style={{width:'auto',height:'auto',margin:'10px'}}>

 {
   comments.map((comment,index)=>(
 <Card style={{overflow:'auto',borderWidth:0,width:'500px',left:'850px',top:'170px',position:'relative',backgroundColor:'#D0FFC8'}} >
    <CardHeader
      avatar={
        <Avatar id="avatar"  src={"https://pai-event.herokuapp.com/api/file/av?email="+comment.userEmail}
        style={{

          width: "60px",
          height: "60px",
        }}
          />
          
      }

        title= {comment.userEmail} 
        subheader={comment.date.slice(0,16).replace('T',' ')}
      />
      
      <CardContent>
        <Typography >
         {comment.text}
        </Typography>
      
      </CardContent>
      <ButtonGroup>
          <IconButton aria-label="delete" variant = "outline-danger" onClick={this.deleteComment.bind(this,comment.commentId)}>  
        
             <DeleteIcon />
        </IconButton>

        </ButtonGroup>
    </Card>
       ))
      }
<Card style={{backgroundColor:'#D0FFC8',width:'500px',left:'850px',top:'180px',position:'relative'}} >
            <Card.Header>Leave your opinion about this event!</Card.Header>  
               <Form onSubmit={this.handleSubmit}>
                    <Card.Body >
                    <Form.Row>
                   
                                <Form.Group  as={Col}>
                                  
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        name = "text"
                                        onChange={e=>this.text=e.target.value}
                                        placeholder="Your comment..."/>
                                </Form.Group>
                                <Button style={{ marginTop:'-0.5%'}} size="sm" className="buttonW" variant ="success" type = "submit" onSubmit={this.handleSubmit}><Icon component= {SaveIcon}/>Save</Button>
                         </Form.Row>         
                     </Card.Body>

            </Form>
        </Card>

  <Card style={{width:'500px',top:'100px',left:'50px',position:'fixed',backgroundColor:'#D0FFC8'}}>

      <MDBCardImage  src={"https://pai-event.herokuapp.com/api/file/bg?eventId="+event.eventID} position='top' alt='Brak zdjęcia' />


      <CardContent>
    <CardHeader style={{textAlign:'center'}}>{event.name}</CardHeader>
    <Typography  style={{textAlign:'center'}}>
          Name: {event.name}
        </Typography >
        <Typography  style={{textAlign:'center'}}>
          Province: {event.province}
        </Typography >
        <Typography  style={{textAlign:'center'}}>
          City: {event.city}
        </Typography >
        <Typography  style={{textAlign:'center'}}>
          Street: {event.address}
        </Typography >
      
        <Typography  style={{textAlign:'center'}}>
         Date of start event: {event.dateOfStarEvent}
        </Typography >

        </CardContent>
    </Card>
     
</div>

  );
  
}
}
