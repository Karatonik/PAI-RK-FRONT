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

export default class RequestsToEventsFromUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
        show: false,
        search:'',
        requests:[],
        currentPage:1,
        partyPerPage:5
      }
    }
    
    handleSubmit=e=>{
        e.preventDefault();
        const participationId =localStorage.getItem('participationId');
        const eventID =localStorage.getItem('eventID');
  
        
        console.log(participationId,eventID);
        const config ={
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token') 
            },
           
        };
        axios.put('/event/acceptPart/'+participationId+'/'+eventID,config).then(
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
    
  
    const email = localStorage.getItem('email')
    axios.get('/parti/user/'+email,config).then(
        
      res => {  
      
        console.log(" Id parti: ",localStorage.getItem('participationId'),localStorage.getItem("request"));
       

              this.setState({
                requests:res.data
              })
        console.log(res)
        
      },
      
   err =>{
      console.log(err)
  }
  )
  
  }
  
    setRequests= requests =>{
      this.setState({
        requests:requests
      });
    };
  

    render() {
        const {requests} =this.state;
 

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
                          <StyledTableCell >Email</StyledTableCell >
                          <StyledTableCell >Nick</StyledTableCell >
                          <StyledTableCell >EventID</StyledTableCell >
                    </TableRow>
                 </TableHead>
                 <TableBody >
                  {requests.length===0 ?
                            <TableRow align="center">
                                <td colSpan ="6"> No events which you want to join.</td>
                            </TableRow>:
                     requests.map((request,index)=>(
                              <StyledTableRow    key={request.participationId} onClick={this.toggle}  >
                                <StyledTableCell >{request.userPAIDto.email}</StyledTableCell>
                              <StyledTableCell >{request.userPAIDto.nick}</StyledTableCell>
                              <StyledTableCell>{request.eventPAIDto.eventID}</StyledTableCell>         
                            </StyledTableRow>
                      ))
                   }
                 </TableBody>    
              </Table>
              </TableContainer>
        );
        
    }
}


