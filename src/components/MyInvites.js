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

export default class MyInvites extends Component {

    constructor(props){
        super(props);
        this.state = {
        show: false,
        invites:[],
  
      }
    }
    
    handleSubmit=e=>{
        e.preventDefault();
        const participationId =localStorage.getItem('participationId');
        const eventID =localStorage.getItem('eventID');
  
        
       
        const config ={
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token') 
            },
           
        };
        const email = localStorage.getItem('email')
        console.log(participationId,eventID,email);
        axios.put('http://localhost:8080/api/user/accept/'+participationId+'/'+email,config).then(
           res =>{
          
            this.setState({
              
                
            })
           
         
                window.location.reload();
            
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
       
      const config ={
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': 'Authorization'
      },
         
      };
    
  
    const eventID = localStorage.getItem('eventID')
    console.log(eventID)
    axios.get('http://localhost:8080/api/parti/event/1',config).then(
        
      res => {  
      
        
           
              this.setState({
                invites:res.data
              })
        console.log(res)
        
      },
      
   err =>{
      console.log(err)
  }
  )
  
  }
  
    setInvites= invites =>{
      this.setState({
        invites:invites
      });
    };
  

    render() {
        const {invites} =this.state;
 

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
                      Accept this shit to event?!
                      <Button   onClick={this.handleSubmit} style ={{backgroundColor:'#007bff',margin:'7px'}}>
                                Yes
                                </Button>
                    
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
                    
                          <StyledTableCell >Event Name</StyledTableCell >
                          <StyledTableCell >Event City</StyledTableCell >
                          <StyledTableCell >Event Province</StyledTableCell >
                          <StyledTableCell >Event Address</StyledTableCell >
                          <StyledTableCell >Event Access</StyledTableCell >
                          <StyledTableCell >Event Date of create</StyledTableCell >
                          <StyledTableCell >Event Date if start Event</StyledTableCell >
                          <StyledTableCell >Your Nick</StyledTableCell >
                          <StyledTableCell >Your Email</StyledTableCell >
                          {/* <Button   onClick={this.handleSubmit} style ={{backgroundColor:'#007bff',margin:'7px'}}>
                                Yes
                                </Button>
                     */}
                     
                          
                    </TableRow>
                 </TableHead>
                 <TableBody >
                  {
                     invites.map((invite,index)=>(
                              <StyledTableRow    key={invite.participationId} onClick={this.toggle}  >
                    
                                 <StyledTableCell>{invite.eventPAIDto.name}</StyledTableCell>
                                 <StyledTableCell>{invite.eventPAIDto.city}</StyledTableCell>
                                 <StyledTableCell>{invite.eventPAIDto.province}</StyledTableCell>
                                 <StyledTableCell>{invite.eventPAIDto.access}</StyledTableCell>
                                 <StyledTableCell>{invite.eventPAIDto.address}</StyledTableCell>
                                
                                 <StyledTableCell>{invite.eventPAIDto.dateOfCreate}</StyledTableCell>
                                 <StyledTableCell>{invite.eventPAIDto.dateOfStarEvent}</StyledTableCell>
                           
                           
                              <StyledTableCell >{invite.userPAIDto.nick}</StyledTableCell>
                                    
                              <StyledTableCell >{invite.userPAIDto.email}</StyledTableCell>
                              < Link to={"acceptInvite/"+invite.participationId }className= "btn btn-sm btn-outline-primary">Accept Invite </Link>{' '}
                            
                                           
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

