import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Card} from 'react-bootstrap'
import { Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class EventPage extends Component {
  constructor(props){
    super(props);
    this.state = {
    show: false,
    search:'',
    events:[],
    currentPage:1,
    partyPerPage:5
  }
}


handleSubmit=e=>{
  e.preventDefault();
  const email =localStorage.getItem('email');
  const eventID =localStorage.getItem('eventID');

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
  axios.post('http://localhost:8080/api/event/addUser/'+data.email+'/'+eventID,config).then(
     res =>{
          localStorage.setItem('eventID',res.data.eventID);
          localStorage.setItem('participationId',res.data.participationId);
          // localStorage.setItem('request',res.data.request);
          console.log(" Id parti: ",localStorage.getItem('participationId'))

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








  toggle = () => this.setState((currentState) => ({show: !currentState.show}));
  close = () => this.setState((currentState) =>({show:false}));


  componentDidMount = ()=> {
     const eventID = localStorage.getItem('eventID')
     console.log(eventID)
    const config ={
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem('token') 
        },
       
    };
  

  
  axios.get('http://localhost:8080/api/event/',config).then(
    res => {
        
      console.log(localStorage.getItem('eventID'))
      console.log(res)
        

            this.setState({
              events:res.data
            })
      
    },
    
 err =>{
    console.log(err)
}
)

}

  setPartys = partys =>{
    this.setState({
      partys:partys
    });
  };








    render() {
        const {events} =this.state;
 

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
          <div>
              {this.state.show && <Card  style={{width:'400px',margin:'10px',left:'500px',backgroundColor:'#D0FFC8',fontSize:'20px'}}>    
                 <Icon  component= {WarningIcon} />
                 <Icon component= {WarningIcon} style={{marginLeft:"94%",marginTop:'-6%'}}/>
                      Request to join event
                      <Button   onClick={this.handleSubmit} style ={{backgroundColor:'#007bff',margin:'7px'}}>
                                Yes
                                </Button>
                                <div className = "form-group">
                  <label>Email</label>
                  <input type = "email" className = "form-control" placeholder = "Email"
                  onChange={e=>this.email=e.target.value}/>
              </div>
                    <Button onClick={this.close} variant = "outline-danger" style ={{backgroundColor:' #ff6666',margin:'7px'}}>
                      No
                    </Button >
                 <Icon component= {WarningIcon} style={{marginLeft:"94%"}} />
                 <Icon component= {WarningIcon} style={{marginTop:'-6%'}}/>
                 </Card>} 
          </div>
          <TableContainer component={Paper} elevation={0}>
              <Table className='ui-table zui-table-horizontal zui-table-highlight'>
                <TableHead  > 
                  <TableRow  >   
                          <StyledTableCell >ID</StyledTableCell >
                          <StyledTableCell >Name</StyledTableCell >
                          <StyledTableCell >Province</StyledTableCell >
                          <StyledTableCell >City</StyledTableCell >
                          <StyledTableCell >Address</StyledTableCell >
                          <StyledTableCell >Access</StyledTableCell >
                          <StyledTableCell >Date of create</StyledTableCell >
                          <StyledTableCell >Actions</StyledTableCell >
                    </TableRow>
                 </TableHead>
                 <TableBody >
                  {
                     events.map((event,index)=>(
                              <StyledTableRow    key={event.name}>
                                <StyledTableCell >{event.eventID}</StyledTableCell>
                              <StyledTableCell >{event.name}</StyledTableCell>
                              <StyledTableCell>{event.province}</StyledTableCell>
                              <StyledTableCell>{event.city}</StyledTableCell>
                              <StyledTableCell>{event.address}</StyledTableCell>
                              <StyledTableCell>{event.access}</StyledTableCell>
                              <StyledTableCell>{event.dateOfCreate.replace(/:[^:]*$/,'').replace('T',' ') }</StyledTableCell>    
                              <StyledTableCell>< Link to={"event/"+event.eventID }className= "btn btn-sm btn-outline-primary"> Join</Link>{' '}
                              </StyledTableCell>   
                            </StyledTableRow>
                            
                      ))
                   }
                   
                 </TableBody>    
              </Table>
              </TableContainer>
     </>
        );
        
    }
}

