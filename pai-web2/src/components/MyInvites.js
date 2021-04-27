import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default class MyInvites extends Component {
    render() {
      
  
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
        
        function createData(name, calories, fat, carbs, protein) {
          return { name, calories, fat, carbs, protein };
        }
        
        const rows = [
          createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
         
        ];
    
  
  
  
       
        
          return (
           
            <TableContainer component={Paper} elevation={0}>
              
            <Table  className='ui-table zui-table-horizontal zui-table-highlight'>
              <TableHead  > 
             
                        
                      
                <TableRow  >
                  <StyledTableCell>Name of Event</StyledTableCell>
                  <StyledTableCell color="#2b793d" align="left" >Calories</StyledTableCell>
                  <StyledTableCell align="right" >Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="left"> Actions</StyledTableCell>

                      
                </TableRow>
                
                <Button  size="sm" className="buttonW" variant ="success" type = "submit"><Icon component= {CheckIcon}/>Save</Button>{' '}     
                        <Button size="sm" className="buttonW"  variant ="info" type = "reset"><Icon component= {ClearIcon}/>Reset</Button>{' '}
                 
              </TableHead>  
              
              <TableBody >
                {rows.map((row) => (
                  <StyledTableRow  key={row.name} onClick={event =>  window.location.href='/infoComments'} >
                    <StyledTableCell  component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell  align="left">{row.calories} </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell >
                   
                   
                             
                    </StyledTableCell>
                  
                  
                  </StyledTableRow>                
                ))}
                      
              </TableBody>    
             
            </Table>
            
          </TableContainer>
        
  
          );
          
      }
}

