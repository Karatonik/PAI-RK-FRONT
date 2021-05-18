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
export default class RequestToEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
    show: false,
    search:'',
    participations:[],

  }
}

  componentDidMount = ()=> {
     
    const config ={
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem('token') 
        },
       
    };
  
    const eventID= this.props.match.params.id
    

    axios.get('/parti/event/from/user/'+eventID,config).then(
    res => {
         
      
      console.log(res)
        
     
            this.setState({
                participations:res.data
                
                
            })
          
      
    },
    
 err =>{
    console.log(err)
}
)

}

  setParticipations = participations =>{
    this.setState({
        participations:participations
    });
  };








    render() {
        const {participations} =this.state;
 

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
          <TableContainer component={Paper} elevation={0}style={{marginTop:'12%'}}>
              <Table className='ui-table zui-table-horizontal zui-table-highlight'>
                <TableHead  > 
                  <TableRow  >   
                          <StyledTableCell >Email</StyledTableCell >
                          <StyledTableCell >Name</StyledTableCell >
                          <StyledTableCell >Actions</StyledTableCell >
                        
                          
                    </TableRow>
                 </TableHead>
                 <TableBody >
                  {participations.length===0 ?
                            <TableRow align="center">
                                <td colSpan ="6"> Nobody want to join to your event.</td>
                            </TableRow>:
                     participations.map((participation,index)=>(
                              <StyledTableRow    key={participation.participationId} onClick={this.toggle}  >
                            
                              <StyledTableCell >{participation.userPAIDto.email}</StyledTableCell>
                              <StyledTableCell>{participation.userPAIDto.nick}</StyledTableCell>
                                 
                              < Link to={participation.eventPAIDto.eventID+"/"+participation.participationId }className= "btn btn-sm btn-outline-primary">Accept User </Link>{' '}
                            
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

