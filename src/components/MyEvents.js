import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class MyEvents extends Component {
  constructor(props){
    super(props);
    this.state = {
    show: false,
    search:'',
    events:[],

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
  axios.post('/event/addUser/'+data.email+'/1',config).then(
     res =>{
          localStorage.setItem('eventID',res.data.eventID);
          localStorage.setItem('participationId',res.data.participationId);
          localStorage.setItem('request',res.data.request);
          console.log(" Id parti: ",localStorage.getItem('participationId'))

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
  
const email = localStorage.getItem('email')
  
  axios.get('/user/events/admin/'+email,config).then(
    res => {
        
      localStorage.setItem(res.data.eventID,'eventID')
      console.log(res)
      console.log(localStorage.getItem('eventID'))
        

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
         
          <TableContainer component={Paper} elevation={0} style={{marginTop:'12%'}}>
              <Table className='ui-table zui-table-horizontal zui-table-highlight'>
                <TableHead  > 
                  <TableRow  >   
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
                  {events.length===0 ?
                            <TableRow align="center">
                                <td colSpan ="6"> Not create events by yourself.</td>
                            </TableRow>:
                     events.map((event,index)=>(
                              <StyledTableRow    key={event.name} onClick={this.toggle}  >
                              <StyledTableCell >{event.name}</StyledTableCell>
                              <StyledTableCell>{event.province}</StyledTableCell>
                              <StyledTableCell>{event.city}</StyledTableCell>
                              <StyledTableCell>{event.address}</StyledTableCell>
                              <StyledTableCell>{event.access}</StyledTableCell>
                              <StyledTableCell>{event.dateOfCreate.replace(/:[^:]*$/,'').replace('T',' ')}</StyledTableCell>    
                              <StyledTableCell>
                              < Link to={"addUser/"+event.eventID }className= "btn btn-sm btn-outline-primary">Add</Link>{' '}
                              < Link to={"showRequests/"+event.eventID }className= "btn btn-sm btn-outline-primary">Requests</Link>{' '}
                              < Link to={'infoComments/'+event.eventID}className= "btn btn-sm btn-outline-primary">Show</Link>{' '}
                              < Link to={'addBg/'+event.eventID}className= "btn btn-sm btn-outline-primary">Set bg</Link>{' '}
                              </StyledTableCell>    
                            </StyledTableRow>
                            
                      ))
                   }
                 </TableBody>    
              </Table>
              </TableContainer>
        );
        
    }
}

