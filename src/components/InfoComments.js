import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {Card,Form,Col,Button,ButtonGroup} from 'react-bootstrap'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import imageEvent1 from './Images/event1.jpg'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
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
  axios.get("http://localhost:8080/api/event/"+eventID)
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

      
      axios.get("http://localhost:8080/api/event/comments/"+eventID,config).then(
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
state={}
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
  axios.post('http://localhost:8080/api/comm/'+email+'/'+eventID+'/'+data.text,config).then(
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
  axios.delete("http://localhost:8080/api/comm/"+commentId)
  .then(res=>{
      if(res.data!=null){
          this.setState({
              comments:this.state.comments.filter(comment => comment.commentId !== commentId)

          });
          console.log(res)
      }
      else{
        console.log('error')
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#D0FFC8',
    color: '#295820',
    fontWeight:"bold",
    fontSize:15
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




  return (
    <>
 <div style={{width:'400px',marginTop:'10.5%',marginLeft:'50.6%'}} >
 {
   comments.map((comment,index)=>(
 <Card style={{overflow:'auto',borderWidth:0}} >
    <CardHeader
       avatar={
        <Avatar aria-label="recipe">
          R
        </Avatar>
      }
        title= {comment.userEmail} 
        subheader={comment.date}
      />
      <CardContent>
        <Typography >
         {comment.text}
        </Typography>
      
      </CardContent>
      <ButtonGroup>
          {/* <Link to={"edit/"+comment.commentId }className= "btn btn-sm btn-outline-primary"><Icon component= {EditIcon}/></Link>{' '} * */}
         {/* <IconButton  aria-label="Edit"  variant = "outline-danger" onClick={this.handleTaskUpdate.bind(this,comment.commentId)}>  
             <EditIcon />
        </IconButton> */}
          <IconButton aria-label="delete" variant = "outline-danger" onClick={this.deleteComment.bind(this,comment.commentId)}>  
             <DeleteIcon />
        </IconButton>
        </ButtonGroup>
    </Card>
       ))
      }
 </div>
<div style={{width:'500px',marginTop:'10.5%',marginLeft:'73%'}}>
<Card style={{backgroundColor:'#D0FFC8'}} >
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
  </div>
  

  <MDBCard style={{ maxWidth: '22rem' ,marginTop:'-45%'}}>
      <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/184.jpg' position='top' alt='...' />
      <MDBCardBody>
    <MDBCardTitle>{event.name}</MDBCardTitle>
        <MDBCardText>
          {event.province}{event.city}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
     
</>

  );
  
}
}
